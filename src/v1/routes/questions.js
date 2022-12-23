const express = require("express");
const {
  createQuestions,
  getQuestionByQuizId,
} = require("../controllers/questions.controller");

const routes = express.Router();

routes.post("/", createQuestions);

routes.get("/:quizId", getQuestionByQuizId);

module.exports = routes;
