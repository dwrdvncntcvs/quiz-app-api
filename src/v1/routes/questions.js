const express = require("express");
const {
  createQuestions,
  getQuestionByQuizId,
  deleteQuestion,
  updateQuestion,
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

routes.put(
  "/:questionId",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER), checkQuestionExistence],
  updateQuestion
);

routes.delete(
  "/:questionId",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER), checkQuestionExistence],
  deleteQuestion
);

module.exports = routes;
