const express = require("express");

const app = express();

// app.get(/.*fly$/, (req, res) => {
//   res.send("Hello Suhani");
// });

// app.get(/a/, (req, res) => {
//   res.send("Hello Suhani");
// });

// This will only handle GET call to user 
// app.get("/user", (req, res) => {
//   console.log("user id", req.query);

//   res.send({ firstName: "suhani", lastName: "Kapasiya" });
// });


// How to handle Dynamic route 

app.get("/user/:userId",(req,res)=>{
  console.log(req.params);

    res.send({ firstName: "suhani", lastName: "Kapasiya" });
})


// app.post("/user", (req, res) => {
//     console.log("Save Data to the database");

//   res.send("Data successfully saved to the database");
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted successfully");
// });

// app.use("/user", (req, res) => {
//   res.send("hahahaha");
// });

//this will match all the HTTP method API calls to /test
// app.use("/text", (req, res) => {
//   res.send("Hello Hello Hello---------------- ");
// });


//  middleware class code Notes 


// GET /user => It check all the app.xxx("matching route") functions goes up to routr handler and all between funtion are called midlleware and the funtion which actually sending response are called routehandler 
// GET /user => midlleware chain => request handler


app.use("/",(req,res,next)=>{
  // res.send("Handling / route");
   next();  // middleware
})

app.use("/user", 

  (req,res,next)=>{
    console.log("Handling /user route");
    next();  //middleware
  },
  (req,res,next)=>{
    next(); //middleware
  },
  (req, res, next) => {
  console.log("Handling the route user 2!!"); 
  //this fun is called  route handler because it send response form server and all the funtion come between are called middleware 
   res.send("2nd route handler");
   next();
}


);

app.use("/user",
 (req,res,next)=>{
     console.log("Handling the route user 1!!"); // route handler
  
    //  res.send("Response1!")
     next();
 
});


// middlewares code 
const {userAuth,adminAuth} = require("./middlewares/auht")



app.use("/admin",adminAuth);
// app.use("/user",userAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/user/login", (req, res) => {
  res.send("User Loing Succesfully");
});

;

app.get("/admin/getAllData",(req,res)=>{
  res.send("ALl Data sent")
})


app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});


//ERROR  handling  by wildcard
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