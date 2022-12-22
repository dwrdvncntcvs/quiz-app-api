const {
  create,
  findUserByUsername,
  comparePassword,
} = require("../models/User");

const { sign } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../utils/variables");

const createUser = async (req, res, next) => {
  const { username, password, first_name, last_name, role } = req.body;

  try {
    const data = await create({
      username,
      password,
      first_name,
      last_name,
      role,
    });
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

const authUser = async (req, res) => {
  const { id, username, first_name, last_name } = req.user;

  const payload = {
    id,
    username,
    name: `${first_name} ${last_name}`,
  };

  const token = sign(payload, SECRET_KEY);

  return res.status(200).send({ token });
};

module.exports = {
  createUser,
  authUser,
};
