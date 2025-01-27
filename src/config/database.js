const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://suhanikapasiya2018:OEH9QAxrUnf70ZOg@cluster0.c5yqc7b.mongodb.net/TinderApp"
  );
};

module.exports = connectDB;


// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connect = () => {
//   mongoose
//     .connect(process.env.MONGODB_URL, {
//       dbName: process.env.DBNAME,
//     })
//     .then(() => console.log("DB Connected Successfully"))
//     .catch((error) => {
//       console.log("DB Connection Failed");
//       console.error(error);
//       process.exit(1);
//     });
// };