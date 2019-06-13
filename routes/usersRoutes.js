const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware
const { inputDataChecker, requiredData, validateData } = require('../middleware')
const updateUserData = ['username', 'department']
const IdDataCheck = [requiredData(inputDataChecker, updateUserData), validateData('Users')]

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

//==== PUT ====//
router.put('/:id', IdDataCheck, async (req, res) => {
  try {
    let data = await db.update(req.data.id, req.body, 'Users')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

//==== DELETE ====//
router.delete('/:id', validateData('Users'), async (req, res) => {
  try {
    let data = await db.remove(req.data.id)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted record ${req.params.id}` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router