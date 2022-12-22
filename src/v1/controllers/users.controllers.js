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

const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  const data = await findUserByUsername(username);

  if (!data)
    return res.status(403).send({ msg: "Invalid Username or Password" });

  const isPasswordValid = await comparePassword(data.password, password);

  if (!isPasswordValid)
    return res.status(403).send({ msg: "Invalid Username or Password" });

  const token = sign(
    {
      id: data.id,
      username: data.username,
      name: `${data.first_name} ${data.last_name}`,
    },
    SECRET_KEY
  );

  return res.status(200).send({ token });
};

module.exports = {
  createUser,
  authUser,
};
