const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const profileRoute = express.Router();

const { userAuth } = require("../middlewares/auht");
const { validateProfileEditData } = require("../utils/validation");

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {

    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    console.log("idLoggedInUser =>", loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    console.log(loggedInUser);

    await loggedInUser.save();

    res.send("Profile updated successfully");
  } catch (err) {
    res.send("ERROR :" + err.message);
  }
});

//TODO   for forgetpassword flow
profileRoute.patch("/profile/password", userAuth, async (req, res) => {
  
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (email !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Unauthorized : Email does not match." });
    }

    console.log("User authenticated", req.user);

    //Encrypted password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword ", hashedPassword);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.send("Password update successfully");
  } catch (err) {
    console.error("Error updating password:", err);
    return res
      .status(500)
      .json({ message: "Unable to update password.", error: err.message });
  }
});

module.exports = profileRoute;
