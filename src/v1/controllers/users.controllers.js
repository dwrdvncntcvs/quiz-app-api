const {
  create,
  updateUserRefreshToken,
  findUserById,
  findUserByRefreshToken,
} = require("../models/User");

const { sign, decode, verify } = require("jsonwebtoken");
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
    });

    return res.status(200).send({ accessToken });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send({ msg: "Something went wrong" });
  }
};

const signOut = async (req, res, next) => {
  const { id } = req.auth_user;
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return res.status(200).send({ message: "Successfully signed out" });
  }

  try {
    const foundUser = await findUserByRefreshToken(refreshToken);

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
      });
      return res.status(200).send({ message: "Successfully signed out" });
    }

    await updateUserRefreshToken(id);
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
    });

    return res.status(200).send({ message: "Successfully signed out" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const createNewRefreshToken = async (req, res) => {
  if (!req.cookies?.jwt) return res.status(403).send({ msg: "Forbidden" });

  const token = req.cookies.jwt;
  const { id } = decode(token);

  const foundUser = await findUserById(id);

  if (!foundUser) return res.status(404).send({ message: "User not found" });

  if (foundUser.refreshToken === "")
    return res.status(403).send({ message: "Forbidden" });

  verify(token, REFRESH_SECRET_KEY, (err, data) => {
    if (err) return res.status(403).send({ message: "Invalid Credentials" });

    const { id, username, name, role } = data;
    const tokenData = { id, username, name, role };

    const newAccessToken = sign(tokenData, ACCESS_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).send({ accessToken: newAccessToken });
  });
};

module.exports = {
  createUser,
  authUser,
  signOut,
  createNewRefreshToken,
};
