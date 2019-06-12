const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')

// Import routes
const usersRoutes = require('../routes/usersRoutes')

// Instantiate server
const server = express()

//==== Global Middleware ====//
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger('dev'))

// Activate routes
server.use('/api/users', usersRoutes)
server.use('/', (req, res) => {
  res.send(`<h1>WebAuth III Challenge API server</h1>`)
})

module.exports = server