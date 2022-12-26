const { verify } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../utils/variables");
const {
  comparePassword,
  findUserByUsername,
  findUserById,
  isUserInputsValid,
} = require("../models/User");

const USER_ROLE = {
  QUIZZER: 1,
  QUIZEE: 2,
  BOTH: 3,
};

const validateRawUser = (req, res, next) => {
  const inputData = req.body;
  const validationObj = isUserInputsValid(inputData);
  const returnObj = {};

  for (let key in validationObj)
    if (validationObj[key] !== true) returnObj[key] = validationObj[key];

  if (Object.keys(returnObj).length > 0) return res.status(400).send(returnObj);

  next();
};

const validateUser = async (req, res, next) => {
  const { username, password } = req.body;

  const data = await findUserByUsername(username);

  if (!data)
    return res.status(403).send({ msg: "Invalid Username or Password" });

  const isPasswordValid = await comparePassword(data.password, password);

  if (!isPasswordValid)
    return res.status(403).send({ msg: "Invalid Username or Password" });

  req.user = data;
  next();
};

const authorizeUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) return res.status(403).send({ msg: "Sign in first" });

  const token = authorization.replace("Bearer ", "");
  verify(token, SECRET_KEY, async (err, data) => {
    if (err) return res.status(err).send({ msg: "Sign in first" });

    const { id } = data;
    const userData = await findUserById(id);

    req.auth_user = userData;
    next();
  });
};

const validateRole =
  (role = USER_ROLE.BOTH) =>
  (req, res, next) => {
    const { role: userRole } = req.auth_user;

    if (USER_ROLE.BOTH === role) return next();

    if (userRole !== role)
      return res.status(403).send({ msg: "Access denied." });

    next();
  };

module.exports = {
  validateUser,
  validateRole,
  authorizeUser,
  USER_ROLE,
  validateRawUser,
};
