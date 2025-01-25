const express = require("express");

const app = express();

// const {userAuth,adminAuth} = require("./middlewares/auht")



// app.use("/admin",adminAuth);
// // app.use("/user",userAuth);

// app.get("/user", userAuth, (req, res) => {
//   res.send("User Data Sent");
// });

// app.get("/user/login", (req, res) => {
//   res.send("User Loing Succesfully");
// });

// ;

// app.get("/admin/getAllData",(req,res)=>{
//   res.send("ALl Data sent")
// })


//ERROR  handling

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getUserData",(req,res)=>{
    try{
     
      
   throw new Error("dvbzhjf");
   res.send("User Data Sent");
    }catch(err){
       res.status(500).send("Some Error contact support team")
    }

})
// wild card error handling

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});


app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
