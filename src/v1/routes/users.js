const express = require("express");
const {
  createUser,
  authUser,
  signOut,
  createNewRefreshToken,
  getUser,
} = require("../controllers/users.controllers");
const {
  validateAuth,
  authorizeUser,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createUser);

routes.post("/auth", [validateAuth], authUser);

routes.post("/sign-out", [authorizeUser], signOut);

routes.get("/refresh-token", createNewRefreshToken);

routes.get("/", [authorizeUser], getUser);

module.exports = routes;
