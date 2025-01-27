const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://suhanikapasiya2018:OEH9QAxrUnf70ZOg@cluster0.c5yqc7b.mongodb.net/TinderApp"
  );
};

module.exports = connectDB;

