const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

module.exports = routes;
