const express = require("express");
const {
  createQuizResult,
  getAllUserQuizResults,
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

routes.get("/:userId", [checkUserExistence], getAllUserQuizResults);

module.exports = routes;
