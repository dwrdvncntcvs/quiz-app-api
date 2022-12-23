const { Schema, model } = require("mongoose");

const quizResultSchema = new Schema({
  quizId: String,
  score: Number,
  totalItems: Number,
  percentage: Number,
  date: Date,
  quizTitle: String,
  userId: String,
});

const QuizResult = model("QuizResult", quizResultSchema);

const create = async ({
  quizId,
  score,
  totalItems,
  date,
  quizTitle,
  percentage,
  userId,
}) => {
  const data = await QuizResult.create({
    quizId,
    score,
    totalItems,
    date,
    percentage,
    quizTitle,
    userId,
  });

  return data;
};

module.exports = { QuizResult, create };