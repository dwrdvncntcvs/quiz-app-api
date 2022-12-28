const express = require("express");
const { createUser, authUser } = require("../controllers/users.controllers");
const {
  validateUser,
  validateAuth,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [validateAuth], authUser);

module.exports = routes;
