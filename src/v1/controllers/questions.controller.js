const { handleValidationError } = require("../../utils/mongoDbExtra");
const {
  create,
  findByQuizId,
  deleteOneQuestion,
  getQuestionCountByQuizId,
} = require("../models/Question");
const { updateQuizTotalItems, findQuizById } = require("../models/Quiz");

const createQuestions = async (req, res) => {
  const body = req.body;
  const { quizId } = req.params;

  console.log(`Creating Questions for Quiz ID: ${quizId}`);
  console.log("Questions: ", JSON.stringify(body));

  try {
    const data = await create(body, quizId);
    const questionTotalCount = await getQuestionCountByQuizId(quizId);
    await updateQuizTotalItems(questionTotalCount, quizId);

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    const { errorMessages, statusCode } = handleValidationError(
      err.message,
      400
    );

    return res.status(statusCode).send(errorMessages);
  }
};

const getQuestionByQuizId = async (req, res) => {
  const { _id } = req.quizData;

  const data = await findByQuizId(_id);

  return res.status(200).send(data);
};

const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const question = req.foundQuestion;

  const data = await deleteOneQuestion(questionId);
  const quiz = await findQuizById(question.quizId);
  await updateQuizTotalItems(
    quiz.totalItems - data.deletedCount,
    question.quizId
  );

  return res.status(200).send(data);
};

module.exports = {
  createQuestions,
  getQuestionByQuizId,
  deleteQuestion,
};
