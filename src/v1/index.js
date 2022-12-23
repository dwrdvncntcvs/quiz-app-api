const express = require("express");
const { quiz, users, questions, quizResult } = require("./routes");

const routes = express.Router();

routes.use("/quizzes", quiz);
routes.use("/users", users);
routes.use("/questions", questions);
routes.use("/quizResult", quizResult);

module.exports = routes;
