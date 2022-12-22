const { verify } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../utils/variables");
const {
  comparePassword,
  findUserByUsername,
  findUserById,
} = require("../models/User");

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
    if (err) {
      return res.status(err).send({ msg: "Sign in first" });
    }

    const { id } = data;
    const userData = await findUserById(id);

    req.auth_user = userData;
    next();
  });
};

module.exports = {
  validateUser,
  authorizeUser,
};
