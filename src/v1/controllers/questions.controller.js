const { create, findByQuizId } = require("../models/Question");

const createQuestions = async (req, res) => {
  const body = req.body;

  const data = await create(body);

  return res.status(200).send(data);
};

const getQuestionByQuizId = async (req, res) => {
  const { _id } = req.quizData;

  const data = await findByQuizId(_id);

  return res.status(200).send(data);
};

module.exports = {
  createQuestions,
  getQuestionByQuizId,
};
