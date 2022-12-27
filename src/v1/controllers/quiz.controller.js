const { create, findAll, update, deleteQuiz } = require("../models/Quiz");

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

const updateQuiz = async (req, res, next) => {
  const { quizId } = req.params;
  const { title, description, tag } = req.body;

  try {
    const data = await update({ title, description, tag }, quizId);

    return res
      .status(201)
      .send({ meta: data, message: `Quiz ${quizId} updated` });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const removeQuiz = async (req, res, next) => {
  const { quizId } = req.params;

  try {
    const data = await deleteQuiz(quizId);

    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createQuiz,
  findAllQuiz,
  updateQuiz,
  removeQuiz,
};
