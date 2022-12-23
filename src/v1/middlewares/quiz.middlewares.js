const { isValidObjectId } = require("mongoose");
const { findById } = require("../models/Quiz");

const checkQuizExistence = async (req, res, next) => {
  const { quizId } = req.params;

  const isValidId = isValidObjectId(quizId);

  if (!isValidId) return res.status(404).send({ message: "Quiz not found." });

  const quizData = await findById(quizId);

  if (!quizData) return res.status(404).send({ message: "Quiz not found." });

  req.quizData = quizData;
  next();
};

module.exports = {
  checkQuizExistence,
};
