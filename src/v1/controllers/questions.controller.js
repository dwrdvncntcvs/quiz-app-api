const { handleValidationError } = require("../../utils/mongoDbExtra");
const { create, findByQuizId } = require("../models/Question");

const createQuestions = async (req, res) => {
  const body = req.body;
  const { quizId } = req.params;

  try {
    const data = await create(body, quizId);

    return res.status(200).send(data);
  } catch (err) {
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

module.exports = {
  createQuestions,
  getQuestionByQuizId,
};
