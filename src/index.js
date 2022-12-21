const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./v1/index"));

app.listen(PORT, () => {
  console.log("SERVER UP -> PORT: ", PORT);
});
