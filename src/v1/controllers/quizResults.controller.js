const { calculatePercentage } = require("../../utils/helpers");
const { getTotalItems } = require("../models/Question");
const {
  create,
  findAllByUserId,
  findAllByQuizId,
  findByQuizResultId,
} = require("../models/QuizResult");
const { findUserById } = require("../models/User");
const { findQuizById } = require("../models/Quiz");

const createQuizResult = async (req, res) => {
  const { score } = req.body;
  const { _id: quizId } = req.quizData;
  const { _id: userId } = req.auth_user;
  const totalItems = await getTotalItems(quizId);
  const percentage = calculatePercentage(score, totalItems);

  const data = await create({
    quizId,
    score,
    totalItems,
    percentage,
    date: new Date(),
    userId,
  });

  return res.status(200).send(data);
};

const getAllUserQuizResults = async (req, res) => {
  const { userId } = req.params;

  const data = await findAllByUserId(userId);

  return res.status(200).send(data);
};

const getQuizResult = async (req, res) => {
  const { quizResultId } = req.params;

  try {
    const quizResultData = await findByQuizResultId(quizResultId);
    const userData = await findUserById(quizResultData.userId);
    const quizData = await findQuizById(quizResultData.quizId);

    const name = `${userData.first_name} ${userData.last_name}`;

    const data = {
      ...quizResultData._doc,
      user: {
        name,
      },
      quiz: {
        author: quizData.author,
        title: quizData.title,
        description: quizData.description,
      },
    };

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createQuizResult,
  getAllUserQuizResults,
  getQuizResult,
};
