const express = require("express");
const {
  createQuestions,
  getQuestionByQuizId,
} = require("../controllers/questions.controller");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post(
  "/",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER)],
  createQuestions
);

routes.get("/:quizId", [checkQuizExistence], getQuestionByQuizId);

module.exports = routes;
