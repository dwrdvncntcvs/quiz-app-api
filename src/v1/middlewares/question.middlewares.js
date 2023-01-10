const { isValidObjectId } = require("mongoose");
const { findByQuestionId } = require("../models/Question");

const checkQuestionExistence = async (req, res, next) => {
  const { questionId } = req.params;

  if (!isValidObjectId(questionId))
    return res.status(404).send({ message: "Question not found" });

  const foundQuestion = await findByQuestionId(questionId);

  if (!foundQuestion)
    return res.status(404).send({ message: "Question not found" });

  req.foundQuestion = foundQuestion;
  next();
};

module.exports = {
  checkQuestionExistence,
};
