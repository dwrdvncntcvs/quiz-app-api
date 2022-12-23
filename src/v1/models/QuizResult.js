const { Schema, model } = require("mongoose");

const quizResultSchema = new Schema({
  quizId: String,
  score: Number,
  totalItems: Number,
  percentage: Number,
  date: Date,
  quizTitle: String,
});

const QuizResult = model("QuizResult", quizResultSchema);

const create = async ({
  quizId,
  score,
  totalItems,
  date,
  quizTitle,
  percentage,
}) => {
  const data = await QuizResult.create({
    quizId,
    score,
    totalItems,
    date,
    percentage,
    quizTitle,
  });

  return data;
};

module.exports = { QuizResult, create };
