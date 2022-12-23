const { create, findByQuizId } = require("../models/Question");

const createQuestions = async (req, res) => {
  const body = req.body;

  await create(body);

  return res.status(200).send({ message: "Question", data: req.body });
};

const getQuestionByQuizId = async (req, res) => {
  const { quizId } = req.params;

  const data = await findByQuizId(quizId);

  return res.status(200).send(data);
};

module.exports = {
  createQuestions,
  getQuestionByQuizId,
};
