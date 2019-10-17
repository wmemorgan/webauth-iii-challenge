const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

// Import middleware
const { userAuthorization } = require("../middleware/auth");

// Import routes
const authRoutes = require("../routes/authRoutes");
const usersRoutes = require("../routes/usersRoutes");

// Instantiate server
const server = express();

//==== Global Middleware ====//
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger("dev"));

// Activate routes
server.use("/api/auth", authRoutes);
server.use("/api/users", userAuthorization, usersRoutes);
server.use("/api", (req, res) => {
	res.send({ apiStatus: up });
});
server.use("/", (req, res) => {
	res.send(`<h1>WebAuth III Challenge API server</h1>`);
});

module.exports = server;
