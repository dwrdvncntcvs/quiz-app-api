const express = require("express");
const { quiz, users } = require("./routes");

const routes = express.Router();

routes.use("/quizzes", quiz);
routes.use("/users", users);

module.exports = routes;
