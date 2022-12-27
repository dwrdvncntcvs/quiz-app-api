const { isValidObjectId } = require("mongoose");
const { findById, isQuizInputValid } = require("../models/Quiz");

const checkQuizExistence = async (req, res, next) => {
  const { quizId } = req.params;

  const isValidId = isValidObjectId(quizId);

  if (!isValidId) return res.status(404).send({ message: "Quiz not found." });

  const quizData = await findById(quizId);

  if (!quizData) return res.status(404).send({ message: "Quiz not found." });

  req.quizData = quizData;
  next();
};

const validateQuiz = (req, res, next) => {
  const quizData = req.body;

  const validationObj = isQuizInputValid(quizData);
  const returnObj = {};

  for (let key in validationObj)
    if (validationObj[key] !== true) returnObj[key] = validationObj[key];

  if (Object.keys(returnObj).length > 0) return res.status(400).send(returnObj);

  next();
};

module.exports = {
  checkQuizExistence,
  validateQuiz,
};
