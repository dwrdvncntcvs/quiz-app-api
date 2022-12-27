const { Schema, model, default: mongoose } = require("mongoose");
const { quizValidator } = require("../../utils/validators");
const { deleteManyQuestion } = require("./Question");

const quizSchema = new Schema({
  author: String,
  title: String,
  description: String,
  tag: String,
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
    { title, description, tag }
  );

  return data;
};

const deleteQuiz = async (quizId = "") => {
  const data = await Quiz.deleteOne({ _id: quizId });
  await deleteManyQuestion(quizId);

  return data;
};

const isQuizInputValid = (quizData = {}) => {
  const responseData = {};

  for (let key in quizData) {
    const data = quizData[key];

    switch (key) {
      case "title":
        responseData[key] = quizValidator.validateTitle(data);
        break;
      case "description":
        responseData[key] = quizValidator.validateDescription(data);
        break;
      case "tag":
        responseData[key] = quizValidator.validateTag(data);
        break;
      default:
        throw new Error(
          `${key.toUpperCase()} is not a valid input for quiz fields`
        );
    }
  }

  return responseData;
};

module.exports = {
  Quiz,
  create,
  findAll,
  update,
  deleteQuiz,
  findById,
  isQuizInputValid,
};

const createQueries = (queryObj) => {
  let newQuery = {};

  for (let key in queryObj) {
    const reg = new RegExp(`${queryObj[key]}`, "i");
    newQuery[key] = reg;
  }

  return newQuery;
};
