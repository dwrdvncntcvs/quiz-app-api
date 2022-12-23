const { Schema, model } = require("mongoose");

const quizResultSchema = new Schema({
  quizId: String,
  score: Number,
  data: Date,
  quizTitle: String,
});

const QuizResult = model("QuizResult", quizResultSchema);

module.exports = { QuizResult };
