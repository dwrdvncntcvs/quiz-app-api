const { calculatePercentage } = require("../../utils/helpers");
const { getTotalItems } = require("../models/Question");
const { create } = require("../models/QuizResult");

const createQuizResult = async (req, res) => {
  const { score } = req.body;
  const { _id, title } = req.quizData;
  const totalItems = await getTotalItems(_id);
  const percentage = calculatePercentage(score, totalItems);

  const data = await create({
    quizId: _id,
    score,
    totalItems,
    percentage,
    date: new Date(),
    quizTitle: title,
  });

  return res.status(200).send({ data });
};

module.exports = {
  createQuizResult,
};
