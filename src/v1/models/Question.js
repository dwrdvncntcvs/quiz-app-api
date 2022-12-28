const { Schema, model } = require("mongoose");

const MIN_QUES = 15;
const MIN_OPT = 5;

const questionSchema = new Schema({
  quizId: {
    type: String,
  },
  question: {
    type: String,
    required: [true, "Question is required"],
    validate: {
      validator: (val) => val.trim().length > MIN_QUES,
      message: `Question must be at lease ${MIN_QUES} characters long`,
    },
  },
  options: [
    {
      option: {
        type: String,
        require: [true, "Option is required"],
        validate: {
          validator: (val) => val.trim().length > MIN_OPT,
          message: `Option must be at lease ${MIN_OPT} characters long`,
        },
      },
      isCorrect: Boolean,
    },
  ],
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
