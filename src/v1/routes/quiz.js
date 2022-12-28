const express = require("express");
const {
  createQuiz,
  findAllQuiz,
  updateQuiz,
  removeQuiz,
} = require("../controllers/quiz.controller");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", [authorizeUser, validateRole(USER_ROLE.QUIZZER)], createQuiz);

routes.get("/", [authorizeUser, validateRole()], findAllQuiz);

routes.put(
  "/:quizId",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER), checkQuizExistence],
  updateQuiz
);

routes.delete(
  "/:quizId",
  [authorizeUser, validateRole(USER_ROLE.QUIZZER), checkQuizExistence],
  removeQuiz
);

module.exports = routes;
