const { create, findAll } = require("../models/Quiz");

const createQuiz = async (req, res) => {
  const { author, title, description, tag } = req.body;

  const data = await create({ author, title, description, tag });

  return res.status(201).send(data);
};

const findAllQuiz = async (req, res) => {
  const query = req.query;

  const data = await findAll(query);

  return res.status(200).send(data);
};

module.exports = {
  createQuiz,
  findAllQuiz,
};