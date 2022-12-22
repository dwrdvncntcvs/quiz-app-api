const express = require("express");
const { createUser, authUser } = require("../controllers/users.controllers");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", authUser)

module.exports = routes;
