const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  console.log("user request:", req.user);
  const userId = req.user._id;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



module.exports =  chatRouter;