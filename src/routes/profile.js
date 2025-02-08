const express = require('express');

const profileRoute = express.Router();


const { userAuth } = require("../middlewares/auht");


profileRoute.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});


module.exports = profileRoute;
