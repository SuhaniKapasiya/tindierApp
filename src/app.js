const express = require("express");


// const database = require("./config/database");
// const { connect } = require("mongoose");

const connectDB= require("./config/database");
const User = require("./models/user")
const app = express();


app.post("/signup", async (req,res)=>{
  
  // creating new instance of user model
      const user = new User({
    firstName: "Ruchihim",
    lastName: "Kapasiyaa",
    email: "suhanikapasiya2018@gmail.com",
    password: "Honry@12",
  
  });

  try{

  await user.save();

  res.send("User added succesfully",);

  }catch(err){
      res.status(400).send("Error saving the user" + err.message)
  }
})





connectDB()
  .then(() => {

    console.log("DB Connected Successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  });

// database.connect();