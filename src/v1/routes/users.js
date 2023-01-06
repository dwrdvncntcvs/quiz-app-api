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

routes.post("/sign-out", [authorizeUser], signOut);

routes.get("/refresh-token", createNewRefreshToken);

module.exports = routes;
