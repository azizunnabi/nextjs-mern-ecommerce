const mongoose = require("mongoose");
const connect = async (req, res) => {
  try {
    await mongoose.connect(process.env.mongoDB);
    console.log("DB connected");
  } catch (error) {
    console.log("Connection error", error);
  }
};
module.exports = connect;