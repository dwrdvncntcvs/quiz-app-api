const express = require("express");
const {
  createQuizResult,
  getAllUserQuizResults,
  getQuizResult,
  getAllTakenQuizzes,
  getAllResultsPerQuiz,
} = require("../controllers/quizResults.controller");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
  checkUserExistence,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post(
  "/:quizId",
  [authorizeUser, checkQuizExistence, validateRole(USER_ROLE.QUIZEE)],
  createQuizResult
);

routes.get(
  "/quiz/:quizResultId",
  [authorizeUser, validateRole(USER_ROLE.QUIZEE)],
  getQuizResult
);

routes.get("/user/:userId", [checkUserExistence], getAllUserQuizResults);

routes.get(
  "/quiz-taken/:userId",
  [authorizeUser, validateRole(USER_ROLE.QUIZEE)],
  getAllTakenQuizzes
);

routes.get("/:quizId/user/:userId", [
  authorizeUser,
  validateRole(USER_ROLE.QUIZEE),
  checkQuizExistence,
  getAllResultsPerQuiz,
]);

module.exports = routes;
