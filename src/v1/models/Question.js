const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  quizId: String,
  question: String,
  options: [{ option: String, isCorrect: Boolean }],
});

const Question = model("Question", questionSchema);

const create = async (questionArr = []) => {
  const data = await Question.insertMany(questionArr);

  return data;
};

const findByQuizId = async (quizId) => {
  const data = await Question.find({ quizId });

  return data;
};

module.exports = {
  Question,
  create,
  findByQuizId,
};
