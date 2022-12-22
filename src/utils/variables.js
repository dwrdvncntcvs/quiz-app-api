require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.JWT_KEY,
};
