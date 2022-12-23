const express = require("express");
const { createQuizResult } = require("../controllers/quizResults");
const { checkQuizExistence } = require("../middlewares/quiz.middlewares");

const routes = express.Router();

routes.post("/:quizId",[checkQuizExistence], createQuizResult);

module.exports = routes;
