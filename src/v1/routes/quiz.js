const express = require("express");
const { createQuiz, findAllQuiz } = require("../controllers/quiz.controller");
const { validateQuiz } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post(
  "/",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER), validateQuiz],
  createQuiz
);

routes.get("/", [authorizeUser, validateRole()], findAllQuiz);

module.exports = routes;
