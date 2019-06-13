const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Import data model
const db = require('../data/models')

// Import middleware
const { inputDataChecker, requiredData, validateData, userAuthorization } = require('../middleware')

const userData = ['username', 'password']

//==== Register ====//
const registrationData = [...userData, 'department']
router.post('/register', requiredData(inputDataChecker, registrationData), async (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash
  try {
    let newUser = await db.insert(user, 'Users')
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

//==== Login ====//
router.post('/login', requiredData(inputDataChecker, userData), async (req, res) => {
  let { username, password } = req.body
  try {
    let user = await db.findByUser(username, 'Users')
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

//==== Logout ====//

//==== Custom Middleware ====//
function generateToken(user) {
  return jwt.sign({
    username: user.username,
    department: user.department
  }, process.env.JWT_SECRET, {
    subject: `${user.id}`,
    expiresIn: '2h'
  })
}

module.exports = router