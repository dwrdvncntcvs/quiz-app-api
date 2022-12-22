const express = require("express");
const { createQuiz, findAllQuiz } = require("../controllers/quiz.controller");
const { validateUser } = require("../middlewares/user.middlewares");

const routes = express.Router();

routes.post("/", createQuiz);

routes.get("/", findAllQuiz);

module.exports = routes;
