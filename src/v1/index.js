const express = require("express");
const { quiz } = require("./routes");

const routes = express.Router();

routes.use("/quizzes", quiz);

module.exports = routes;
