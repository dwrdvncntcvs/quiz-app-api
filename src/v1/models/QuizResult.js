const { Schema, model } = require("mongoose");

const quizResultSchema = new Schema({
  quizId: String,
  score: Number,
  totalItems: Number,
  percentage: Number,
  date: Date,
  userId: String,
});

const QuizResult = model("QuizResult", quizResultSchema);

const create = async ({
  quizId,
  score,
  totalItems,
  date,
  percentage,
  userId,
}) => {
  const data = await QuizResult.create({
    quizId,
    score,
    totalItems,
    date,
    percentage,
    userId,
  });

  return data;
};

const findAllByUserId = async (userId) => {
  const data = await QuizResult.find({ userId });

  return data;
};

const findAllByQuizId = async (quizId) => {
  const data = await QuizResult.find({ quizId });

  return data;
};

const findByQuizResultId = async (quizResultId) => {
  const data = await QuizResult.findOne({ _id: quizResultId });

  return data;
};

module.exports = {
  QuizResult,
  create,
  findAllByUserId,
  findAllByQuizId,
  findByQuizResultId,
};
