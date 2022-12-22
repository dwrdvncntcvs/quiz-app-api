require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected"))
  .catch((e) => console.log(e.message));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./v1/index"));

app.use((err, req, res, next) => {
  return res.status(500).send({ msg: err.message });
});

app.listen(PORT, async () => {
  console.log("SERVER UP -> PORT: ", PORT);
});
