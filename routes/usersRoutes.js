const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware
const { inputDataChecker, requiredData, validateData, userAuthorization } = require('../middleware')

// User Resource Routes
//==== GET ====//
router.get('/', userAuthorization, async (req, res) => {
  try {
    let data = await db.getUsers()
    res.send(data)
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

module.exports = router