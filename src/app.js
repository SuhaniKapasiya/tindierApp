const express = require("express");

const app = express();

app.use("/text", (req, res) => {
  res.send("Hello Hello Hello---------------- ");
});

app.use("/hello", (req, res) => {
  res.send("Hello suhani kapasiya---------------------");
});

app.use("/", (req, res) => {
  res.send("Hello form the server"); //req handler
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
