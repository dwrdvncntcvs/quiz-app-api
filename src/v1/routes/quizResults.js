const express = require("express");
const { createQuizResult } = require("../controllers/quizResults");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");
const { authorizeUser } = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/:quizId", [authorizeUser, checkQuizExistence], createQuizResult);

module.exports = routes;
