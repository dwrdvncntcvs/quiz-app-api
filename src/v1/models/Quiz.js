const { Schema, model } = require("mongoose");
const { cleanData } = require("../../utils/helpers");

const quizSchema = new Schema({
  author: String,
  title: String,
  description: String,
  tag: String,
});

const Quiz = model("Quiz", quizSchema);

const create = async ({ author, title, description, tag }) => {
  const data = await Quiz.create({ author, title, description, tag });

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
};

const createQueries = (queryObj) => {
  let newQuery = {};

  for (let key in queryObj) {
    const reg = new RegExp(`${queryObj[key]}`, "i");
    newQuery[key] = reg;
  }

  return newQuery;
};
