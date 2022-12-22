const express = require("express");
const { createQuiz, findAllQuiz } = require("../controllers/quiz.controller");
const {
  validateUser,
  authorizeUser,
} = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createQuiz);

routes.get("/", [authorizeUser], findAllQuiz);

module.exports = routes;
