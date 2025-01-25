const express = require("express");

const app = express();

app.use("/user",
 [ (req,res,next)=>{
     console.log("Handling the route user 1!!"); // route handler
  
    //  res.send("Response1!")
     next();
    
  }],
   (req,res,next)=>{
    console.log("Handling the route user 2!!"); // route ha  ndler
    
    // res.send("Response2!");
      next();
  
   },
   (req,res,next)=>{
    console.log("Handling the route user 3!!"); // route ha  ndler
    
    // res.send("Response3!");
      next();
  
   },
  [ (req,res,next)=>{
    console.log("Handling the route user 4!!"); // route ha  ndler
      next();
    // res.send("Response4!");
  
   },
   (req,res,next)=>{
    console.log("Handling the route user 5!!"); // route ha  ndler
   ;
    // res.send("Response5!");
       next();
  
   }]
)

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
