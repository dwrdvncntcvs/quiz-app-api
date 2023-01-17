const { hash, genSalt, compare } = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    validate: {
      validator: (val) => val.length > 5,
      message: "Username must be at least 5 characters long",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
      message:
        "Minimum eight characters and at least one letter and one number",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["quizzer", "quizee"],
      message: `Role "{VALUE}" is not supported`,
    },
  },
  refreshToken: {
    type: String,
  },
  createdAt: String,
});

userSchema.pre("save", async function () {
  if (this.password === "") return;
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
});

userSchema.post("find", async function (data) {
  delete data.password;
  return data;
});

const User = model("User", userSchema);

const create = async (userData) => {
  const userDataWithToken = { ...userData, refreshToken: "" };
  return await User.create(userDataWithToken);
};

const findUserByUsername = async (username) => {
  const data = await User.findOne({ username });
  return !!data ? data : null;
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

const updateUserRefreshToken = async (userId, refreshToken = "") => {
  await User.findByIdAndUpdate(userId, { refreshToken });
};

const findUserByRefreshToken = async (refreshToken) => {
  const userData = await User.findOne({ refreshToken });

  return userData;
};

const deleteUserById = async (userId) => {
  const user = await User.deleteOne({ _id: userId });

  return user;
};

module.exports = {
  User,
  create,
  findUserByUsername,
  comparePassword,
  findUserById,
  updateUserRefreshToken,
  findUserByRefreshToken,
  deleteUserById,
};
