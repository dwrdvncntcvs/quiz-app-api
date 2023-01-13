const express = require("express");
const {
  createQuiz,
  findAllQuiz,
  updateQuiz,
  removeQuiz,
  getUserQuizzes,
  getQuiz,
} = require("../controllers/quiz.controller");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const {
  authorizeUser,
  validateRole,
  USER_ROLE,
  checkUserExistence,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", [authorizeUser, validateRole(USER_ROLE.QUIZZER)], createQuiz);

routes.get(
  "/",
  // [authorizeUser, validateRole()],
  findAllQuiz
);

routes.get("/:userId", [authorizeUser, checkUserExistence], getUserQuizzes);

routes.get("/quiz/:quizId", [checkQuizExistence], getQuiz);

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
