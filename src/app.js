const express = require("express");

const app = express();






app.get("/user",(req,res)=>{

    res.send({firstName:"suhani",lastName :"Kapasiya"});

})



app.post("/user", (req, res) => {
    console.log("Save Data to the database");
    
  res.send("Data successfully saved to the database");
});


app.delete("/user", (req, res) => {
  res.send("Deleted successfully");
});


app.use("/user", (req, res) => {
  res.send("hahahaha");
});


//this will match all the HTTP method API calls to /test
app.use("/text", (req, res) => {
  res.send("Hello Hello Hello---------------- ");
});




app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
