const express = require("express");
const { userAuth } = require("../middlewares/auht");

const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

//Get all the pending = intersted  connection request for the loggedIn user

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "skills",
      "about",
      "gender",
      "age",
    ]);
    //OR=> }).populate("fromUserId","firstName lastName photoUrl skills")

    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    res.send("Error geting connection request" + error);
  }
});

module.exports = userRouter;
