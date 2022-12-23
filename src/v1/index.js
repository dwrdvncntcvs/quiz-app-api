const express = require("express");
const { quiz, users, questions } = require("./routes");

const routes = express.Router();

routes.use("/quizzes", quiz);
routes.use("/users", users);
routes.use("/questions", questions);

module.exports = routes;
