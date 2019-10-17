const jwt = require('jsonwebtoken')

/**
 * Function that handlers user authentication
 * @param {object} token 
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
    res.status(400).json({ message: `No credentials provided` })
  }
}

const generateToken = user => {
  return jwt.sign({
    username: user.username,
    department: user.department
  }, process.env.JWT_SECRET, {
    subject: `${user.id}`,
    expiresIn: '2h'
  })
}

module.exports = {
  userAuthorization, generateToken
}