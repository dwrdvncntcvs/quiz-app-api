const express = require("express");
const {
  createQuestions,
  getQuestionByQuizId,
  deleteQuestion,
} = require("../controllers/questions.controller");
const {
  checkQuestionExistence,
} = require("../middlewares/question.middlewares");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post(
  "/:quizId",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER)],
  createQuestions
);

routes.get("/:quizId", [checkQuizExistence], getQuestionByQuizId);

routes.delete("/:questionId", [checkQuestionExistence], deleteQuestion);

module.exports = routes;
