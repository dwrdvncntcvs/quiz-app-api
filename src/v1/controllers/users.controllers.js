const { create } = require("../models/User");

const { sign } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../utils/variables");
const { handleValidationError } = require("../../utils/mongoDbExtra");

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
    console.log(err.message);
    const { errorMessages, statusCode } = handleValidationError(
      err.message,
      400
    );
    return res.status(statusCode).send(errorMessages);
  }
};

const authUser = async (req, res) => {
  const { id, username, first_name, last_name, role } = req.user;

  const payload = {
    id,
    username,
    name: `${first_name} ${last_name}`,
    role,
  };

  const token = sign(payload, SECRET_KEY);

  return res.status(200).send({ token });
};

module.exports = {
  createUser,
  authUser,
};
