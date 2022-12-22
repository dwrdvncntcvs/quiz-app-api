const express = require("express");
const { createUser, authUser } = require("../controllers/users.controllers");
const { validateUser } = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [validateUser], authUser);

module.exports = routes;
