const { create, updateUserRefreshToken } = require("../models/User");

const { sign } = require("jsonwebtoken");
const {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
} = require("../../utils/variables");
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

  try {
    const payload = {
      id,
      username,
      name: `${first_name} ${last_name}`,
      role,
    };

    const accessToken = sign(payload, ACCESS_SECRET_KEY, { expiresIn: "24h" });
    const refreshToken = sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "365d",
    });

    await updateUserRefreshToken(id, refreshToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).send({ accessToken });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

const signOut = async (req, res, next) => {
  const { id } = req.auth_user;

  try {
    await updateUserRefreshToken(id);
    res.clearCookie("jwt");

    return res.status(200).send({ msg: "Successfully signed out" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

module.exports = {
  createUser,
  authUser,
  signOut,
};
