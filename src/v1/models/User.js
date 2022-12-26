const { hash, genSalt, compare } = require("bcrypt");
const { Schema, model } = require("mongoose");
const { removeExtraDetails } = require("../../utils/helpers");
const { userValidators } = require("../../utils/validators");

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

userSchema.post("find", async function (data) {
  delete data.password;
  return data;
});

const User = model("User", userSchema);

const create = async (userData) => {
  return await User.create(userData);
};

const findUserByUsername = async (username) => {
  const data = await User.findOne({ username });
  return data ? removeExtraDetails(data) : null;
};

const findUserById = async (id) => {
  const data = await User.findById(id);

  return data;
};

const comparePassword = async (password, enteredPassword) => {
  return await compare(enteredPassword, password);
};

const hashPassword = async (password) => {
  const salt = await genSalt(10, "a");
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const isUserInputsValid = (userData = {}) => {
  const validatedObject = {};

  for (const key in userData) {
    switch (key) {
      case "username":
        validatedObject[key] = userValidators.validateUsername(userData[key]);
        break;
      case "password":
        validatedObject[key] = userValidators.validatePassword(userData[key]);
        break;
      case "first_name":
        validatedObject[key] = userValidators.validateFirstName(userData[key]);
        break;
      case "last_name":
        validatedObject[key] = userValidators.validateLastName(userData[key]);
        break;
      case "role":
        validatedObject[key] = userValidators.validateRole(userData[key]);
        break;
      default:
        throw new Error(`${key.toUpperCase()} is out of scope of user input`);
    }
  }

  return validatedObject;
};

module.exports = {
  User,
  create,
  findUserByUsername,
  comparePassword,
  findUserById,
  isUserInputsValid,
};
