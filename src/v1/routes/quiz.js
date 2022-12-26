const express = require("express");
const { createQuiz, findAllQuiz } = require("../controllers/quiz.controller");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", [authorizeUser, validateRole(USER_ROLE.QUIZZER)], createQuiz);

routes.get("/", [authorizeUser, validateRole()], findAllQuiz);

module.exports = routes;
