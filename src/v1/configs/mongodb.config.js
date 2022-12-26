const mongoose = require("mongoose");

const mongoDbConnect = async (url) => {
  mongoose.set("strictQuery", false);

  try {
    const db = await mongoose.connect(url);
    const database = db.connections[0].name;
    console.log(`Connected to "${database.toUpperCase()}"`);
  } catch (err) {
    console.log("Error Connecting on Database. \nERROR:", err.message);
  }
};

module.exports = { mongoDbConnect };
