require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { mongoDbConnect } = require("./v1/configs/mongodb.config");
const cookieParser = require("cookie-parser");

const DB_URL = process.env.MONGO_DB_URL;
mongoDbConnect(DB_URL);
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", require("./v1/"));

app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(500).send({ msg: err.message });
});

app.listen(PORT, async () => {
  console.log("SERVER UP -> PORT: ", PORT);
});
