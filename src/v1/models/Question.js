const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  quizId: String,
  question: String,
  options: [{ option: String, isCorrect: Boolean }],
});

const Question = model("Question", questionSchema);

const create = async (questionArr = [], quizId) => {
  const questionData = questionArr.map((question) => ({ ...question, quizId }));
  const data = await Question.insertMany(questionData);

  return data;
};

const findByQuizId = async (quizId) => {
  const data = await Question.find({ quizId });

  return data;
};

const getTotalItems = async (quizId) => {
  const data = await Question.count({ quizId });

  return data;
};

const deleteManyQuestion = async (quizId) => {
  const data = await Question.deleteMany({ quizId });
  return data;
};

module.exports = {
  Question,
  create,
  findByQuizId,
  getTotalItems,
  deleteManyQuestion,
};
