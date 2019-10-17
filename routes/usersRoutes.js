const router = require('express').Router()

// Import data models
const db = require('../data/models')

// Middleware
const { inputDataChecker, requiredData, validateData } = require('../middleware')

// Define required fields
const updateUserData = ['username', 'department']

// Validate received data
const IdDataCheck = [requiredData(inputDataChecker, updateUserData), validateData('Users')]

/** Endpoint to retrieve user information
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code and array of users
 */
router.get('/', async (req, res) => {
  try {
    let data = await db.getUsers()
    res.send(data)
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

/** Endpoint to update user information
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code and user object
 */
router.put('/:id', IdDataCheck, async (req, res) => {
  try {
    let data = await db.updateRecord('Users', req.data.id, req.body)
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

/** Endpoint to delete user account
 * @param req - request from client
 * @param res - response to client
 * @returns res - status code plus json
 */
router.delete('/:id', validateData('Users'), async (req, res) => {
  try {
    let data = await db.removeRecord('Users', req.data.id)
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