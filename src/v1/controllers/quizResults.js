const { calculatePercentage } = require("../../utils/helpers");
const { getTotalItems } = require("../models/Question");
const { create } = require("../models/QuizResult");

const createQuizResult = async (req, res) => {
  const { score } = req.body;
  const { _id: quizId, title } = req.quizData;
  const { _id: userId, first_name, last_name } = req.auth_user;
  const totalItems = await getTotalItems(quizId);
  const percentage = calculatePercentage(score, totalItems);
  const name = `${first_name} ${last_name}`;

  const data = await create({
    quizId,
    score,
    totalItems,
    percentage,
    date: new Date(),
    quizTitle: title,
    userId,
    name,
  });

  console.log("Data: ", data);

  return res.status(200).send({ data });
};

module.exports = {
  createQuizResult,
};
