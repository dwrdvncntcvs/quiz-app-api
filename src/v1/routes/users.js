const express = require("express");
const {
  createUser,
  authUser,
  signOut,
  createNewRefreshToken,
} = require("../controllers/users.controllers");
const {
  validateAuth,
  authorizeUser,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [validateAuth], authUser);

routes.get("/sign-out", [authorizeUser], signOut);

routes.get("/refresh-token", [authorizeUser], createNewRefreshToken);

module.exports = routes;
