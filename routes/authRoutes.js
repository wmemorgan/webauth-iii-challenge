const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Import data model
const db = require('../data/models')

// Import middleware
const { inputDataChecker, requiredData, generateToken } = require('../middleware')

// Declare required fields
const userData = ['username', 'password']
const registrationData = [...userData, 'department']

/**
 * Endpoint to register a new user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
router.post('/register', requiredData(inputDataChecker, registrationData), async (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash
  try {
    let newUser = await db.addRecord('Users', user)
    let token = generateToken(newUser)
    res.status(201).json({
      message: `Welcome ${newUser.username}`,
      token
    })
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

/**
 * Endpoint for logging in a user
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
router.post('/login', requiredData(inputDataChecker, userData), async (req, res) => {
  let { username, password } = req.body
  try {
    let user = await db.findByUser('Users', username)
    if (user && bcrypt.compareSync(password, user.password)) {
      let token = generateToken(user)
      res.json({
        message: `Welcome ${user.username}`,
        token
      })
    } else {
      res.status(401).json({ message: `You shall not pass!` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router