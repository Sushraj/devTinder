const express = require("express");
const chatRouter = express.Router();


chatRouter.post("/chat", async (req, res) => {
    const {userId, targetUserId} = req.body;
  res.send("Chat route is working");
});

module.exports =  chatRouter;