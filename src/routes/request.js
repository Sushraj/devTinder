const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.touserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid Status type: "+ status});
      }

      //If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
       { fromUserId,toUserId},
       { fromUserId: toUserId, toUserId:fromUserId }
        ]
      });

      if(existingConnectionRequest){
        return res.status(400).send({message: "Connection request already exists!!"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request sent Successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }

    res.send(user.firstName + "sent the connect request!");
  }
);

module.exports = requestRouter;
