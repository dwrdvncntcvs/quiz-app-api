const { comparePassword, findUserByUsername } = require("../models/User");

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

module.exports = {
  validateUser,
};
