const express = require('express');

const profileRoute = express.Router();


const { userAuth } = require("../middlewares/auht");
const { validateProfileEditData } = require('../utils/validation');


profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});


profileRoute.patch("/profile/edit", userAuth, async (req, res) => {

    try{

      if(!validateProfileEditData(req)){
         throw new Error("Invalid Edit Request")
      }
      
      const loggedInUser = req.user;
      console.log("idLoggedInUser =>", loggedInUser);
      
      Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]))

      console.log(loggedInUser);
      
      await loggedInUser.save();

      res.send("Profile updated successfully")

    }catch(err){
     res.send("ERROR :" + err.message);
    }

});
 
module.exports = profileRoute;
