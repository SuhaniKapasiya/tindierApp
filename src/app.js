const express = require("express");
const connectDB= require("./config/database");

const User = require("./models/user")
const app = express();


app.use(express.json());
app.post("/signup", async (req,res)=>{
  

  console.log("req",req.body);
  
  // creating new instance of user model
  const user = new User(req.body);

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