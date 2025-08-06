const express = require("express");
const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUserId._id,
          status: "accepted",
        },

        {
          fromUserId: loggedInUserId._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log("connectionRequest data", connectionRequest);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUserId._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = userRouter;
