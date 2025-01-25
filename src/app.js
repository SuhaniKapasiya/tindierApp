const express = require("express");

const app = express();

const {userAuth,adminAuth} = require("./middlewares/auht")



app.use("/admin",adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User Loing Succesfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData",(req,res)=>{
  res.send("ALl Data sent")
})





app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
