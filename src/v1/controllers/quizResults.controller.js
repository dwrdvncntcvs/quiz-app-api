const { calculatePercentage } = require("../../utils/helpers");
const { getTotalItems } = require("../models/Question");
const {
  create,
  findAllByUserId,
  findAllByQuizId,
  findByQuizResultId,
  findAllQuizResultsByUserId,
  countUserResultByQuizId,
  findUserResultsByQuizId,
} = require("../models/QuizResult");
const { findUserById } = require("../models/User");
const { findQuizById } = require("../models/Quiz");
const { extractQuizIdSet } = require("../../utils/mongoDbExtra");

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

const getAllTakenQuizzes = async (req, res) => {
  const user = req.auth_user;
  const { userId } = req.params;

  if (user._id.valueOf() !== userId)
    return res.status(403).send({ message: "Access Denied" });

  try {
    const data = await findAllQuizResultsByUserId(userId);
    const quizIdSet = extractQuizIdSet(data);
    const quizzesData = [];

    for (let quizId of quizIdSet) {
      const data = await findQuizById(quizId);
      const attempts = await countUserResultByQuizId({
        quizId,
        userId: user._id,
      });
      const quizData = {
        ...data._doc,
        attempts,
      };
      quizzesData.push(quizData);
    }

    console.log("Quiz Data: ");

    return res.status(200).send(quizzesData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllResultsPerQuiz = async (req, res) => {
  const { quizId, userId } = req.params;
  const quizData = req.quizData;

  try {
    const quizResultsData = await findUserResultsByQuizId({ quizId, userId });

    const resultData = {
      quiz: {
        title: quizData.title,
      },
      quizResultsData,
    };

    return res.status(200).send(resultData);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createQuizResult,
  getAllUserQuizResults,
  getQuizResult,
  getAllTakenQuizzes,
  getAllResultsPerQuiz,
};
