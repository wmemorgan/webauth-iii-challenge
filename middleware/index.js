/** Global Middlware **/
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Import data models
const db = require('../data/models')


//===== Data Validation ====//
/**
 * Higher-order function that enforces required
 * data is being received
 * @param {function} fn 
 * @param {array} dataFields 
 */
const requiredData = (fn, dataFields) => {
  return (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length) {
      res.status(400).json({ message: `Missing user data` })
    } else if (!fn(Object.keys(req.body), dataFields)) {
      res.status(400).json({ message: `Missing required field.` })
    } else {
      next()
    }
  }
}

/**
 * Function which validates data
 * record exists
 * @param {string} table
 * @returns database record 
 */
const validateData = (table) => {
  return async (req, res, next) => {
    try {
      let results = await db.findById(req.params.id, table)
      if (results) {
        req.data = results
        next()
      } else {
        res.status(404).json({ message: `Record not found.` })
      }
    }
    catch (err) {
      res.status(500).send(err.message)
    }
  }
}

/**
 * Helper function that confirms all required data is received
 * @param {array} arr 
 * @param {array} target 
 */
const inputDataChecker = (arr, target) => target.every(v => arr.includes(v)) 

//==== Authentication ====//
/**
 * Function that handlers user authentication
 * @param {object} authorization token 
 * @returns username
 */
const userAuthorization = async (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(403).json({ message: `You are not authorized` })
      } else {
        req.username = payload.username
        next()
      }
    })
  } else {
    res.status(400).json( { message: `No credentials provided` })
  }
}

module.exports = {
  inputDataChecker, requiredData, validateData, userAuthorization
}