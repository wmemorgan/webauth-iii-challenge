/** Global Middlware **/
const jwt = require('jsonwebtoken')

// Import data models
const db = require('../data/models')

const inputDataChecker = (arr, target) => target.every(v => arr.includes(v))
const requiredFields = ['username', 'password']

//===== Data Validation ====//
const requiredData = (dataChecker, dataFields) => {
  return (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length) {
      res.status(400).json({ message: `Missing user data` })
    } else if (!dataChecker(Object.keys(req.body), dataFields)) {
      res.status(400).json({ message: `Missing required field.` })
    } else {
      next()
    }
  }
}

const validateData = (table, data, field) => {
  return async (req, res, next) => {
    try {
      let results = await db.findByField(table, field, data)
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

//==== Authentication ====//
const userAuthorization = async (req, res, next) => {
  let { username, password } = req.body
  const token = req.headers.authorization
  let user = await db.findByField('Users', 'username', username)
  if (token && bcrypt.compareSync(password, user.password)) {
    jwt.verifiy(token, process.env.JWT_SECRET, (err, payload) => {
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