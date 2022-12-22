const { hash, genSalt, compare } = require("bcrypt");
const { Schema, model } = require("mongoose");
const { removeExtraDetails } = require("../../utils/helpers");

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  password: String,
  role: Number,
  createdAt: String,
});

userSchema.pre("save", async function (data) {
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
});

const User = model("User", userSchema);

const create = async (userData) => {
  return await User.create(userData);
};

const findUserByUsername = async (username) => {
  const data = await User.findOne({ username });
  return removeExtraDetails(data);
};

const comparePassword = async (password, enteredPassword) => {
  return await compare(enteredPassword, password);
};

const hashPassword = async (password) => {
  const salt = await genSalt(10, "a");
  const hashedPassword = await hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
};

module.exports = { User, create, findUserByUsername, comparePassword };
