const express = require("express");
const { createQuizResult } = require("../controllers/quizResults");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post(
  "/:quizId",
  [authorizeUser, checkQuizExistence, validateRole(USER_ROLE.QUIZEE)],
  createQuizResult
);

module.exports = routes;
