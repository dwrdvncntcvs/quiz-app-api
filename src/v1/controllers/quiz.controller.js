const { create, findAll } = require("../models/Quiz");

const createQuiz = async (req, res) => {
  const { title, description, tag } = req.body;
  const { first_name, last_name } = req.auth_user;
  const author = `${first_name} ${last_name}`;

  try {
    const data = await create({ author, title, description, tag });

    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
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
