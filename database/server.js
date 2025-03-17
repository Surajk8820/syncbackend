const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database successfully");
  } catch (error) {
    console.error("database connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
