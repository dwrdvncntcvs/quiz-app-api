const { create, findAll } = require("../models/Quiz");

const createQuiz = async (req, res, next) => {
  const user = req.auth_user;

  const { title, description, tag } = req.body;
  const { first_name, last_name, _id } = user;
  const author = `${first_name} ${last_name}`;

  try {
    const data = await create({
      author,
      title,
      description,
      tag,
      userId: _id,
    });

    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

const findAllQuiz = async (req, res, next) => {
  const query = req.query;

  try {
    const data = await findAll(query);

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createQuiz,
  findAllQuiz,
};
