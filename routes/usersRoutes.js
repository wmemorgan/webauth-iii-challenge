const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware

// User Resource Routes
//==== GET ====//
router.get('/', async (req, res) => {
  try {
    let data = await db.getUsers()
    res.send(data)
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

module.exports = router