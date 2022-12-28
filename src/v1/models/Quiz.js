const { Schema, model } = require("mongoose");
const { createQueries } = require("../../utils/mongoDbExtra");
const { deleteManyQuestion } = require("./Question");

const MIN_TITlE = 5;
const MIN_DESC = 20;
const MIN_TAG = 5;

const quizSchema = new Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    validate: {
      validator: (val) => val.length > MIN_TITlE,
      message: `Title must be at least ${MIN_TITlE} characters long`,
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    validate: {
      validator: (val) => val.length > MIN_DESC,
      message: `Description must be at least ${MIN_DESC} characters long`,
    },
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
    validate: {
      validator: (val) => val.length > MIN_TAG,
      message: `Tag must be at least ${MIN_TAG} characters long`,
    },
  },
  userId: String,
});

const Quiz = model("Quiz", quizSchema);

const create = async ({ author, title, description, tag, userId }) => {
  const data = await Quiz.create({ author, title, description, tag, userId });

  return data;
};

const findById = async (quizId) => {
  const data = await Quiz.findById(quizId);

  return data;
};

const findAll = async (queries) => {
  const q = createQueries(queries);

  const data = await Quiz.find(q);

  return data;
};

const update = async ({ title, description, tag }, quizId) => {
  const data = await Quiz.updateOne(
    { _id: quizId },
    { title, description, tag },
    { runValidators: true }
  );

  return data;
};

const deleteQuiz = async (quizId = "") => {
  const data = await Quiz.deleteOne({ _id: quizId });
  await deleteManyQuestion(quizId);

  return data;
};

module.exports = {
  Quiz,
  create,
  findAll,
  update,
  deleteQuiz,
  findById,
};
