const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status true`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save",function(next){
 
  const connectionRequest = this ;
  //check if fromUserId is same as toUserId

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
     throw new Error("Connot send connection request to yourSelf");
  
  }
  next();  

})

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);


module.exports = ConnectionRequestModel;