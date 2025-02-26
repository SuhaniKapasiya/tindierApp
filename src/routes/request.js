const express = require("express");
const { userAuth } = require("../middlewares/auht");
const User = require("../models/user");

const ConnectionRequest = require("../models/connectionRequest");


const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {

    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // if (toUserId === fromUserId.toString()) {
      //   return res
      //     .status(400)
      //     .json({ message: "You cannot send a request to yourself" });
      // } Or best way to check it on Schema level using pre.schema mogoose query

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const user = await User.findOne({ _id: toUserId });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // IF there is an existing Connection Request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      
      if (existingConnectionRequest) {
        return res.status(404).json({
          message: "Connection Request Already Exists",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} is now ${status} in connecting with ${user.firstName}.`,
        data,
      });
    } catch (err) {
      res.send("ERROR :" + err.message);
    }
  }
);



requestRouter.post(
  
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {

    //validate the status
    //Suhani => Ruchi  send request
    //loggedIn = toUserId
    //status = intersted
    //request Id should be valid

    try{

      const loggedInUser = req.user._id;
      const {status ,requestId} = req.params

      const allowedStatus = ["accepted","rejected"]

      if(!allowedStatus.includes(status)){

        return res.status(404).json({message:"Status is not allowed"})
      }

     const connectionRequest = await ConnectionRequest.findOne({
       _id: requestId,
       toUserId: loggedInUser,
       status: "interested",
     });

     if(!connectionRequest){
      return res
            .status(404)
            .json({message :"Connection request not found"})
     }

      connectionRequest.status = status;

      const data =  await connectionRequest.save();

      res.json({message : "Connection request" +  status , data });

      

    }catch(error){
      res.status(400).send("ERROR: " + error.message);

    }

  }
);




module.exports = requestRouter;