require("dotenv").config();

module.exports = {
  ACCESS_SECRET_KEY: process.env.ACCESS_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_KEY,
};
