const { Schema, model, default: mongoose } = require("mongoose");

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

module.exports = {
  Quiz,
  create,
  findAll,
  findById,
};

const createQueries = (queryObj) => {
  let newQuery = {};

  for (let key in queryObj) {
    const reg = new RegExp(`${queryObj[key]}`, "i");
    newQuery[key] = reg;
  }

  return newQuery;
};
