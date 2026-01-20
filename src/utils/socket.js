const express = require("express");
const app = express();
const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    // Handle socket events here
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log("roomId   --->", roomId);

      socket.join(roomId);
    });

    socket.on("sendMessage", (message) => {
      io.to(message.room).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    console.log("New client connected", socket.id);
  });
};

module.exports = initializeSocket;
