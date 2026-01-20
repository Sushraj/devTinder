const http = require("http");
const express = require("express");
const connectDB = require("./config/database");
const app = express();      

const initializeSocket =  (server) => {
  const socket = require("socket.io");
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });   
    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);
        socket.on("joinRoom", (room) => {
          socket.join(room);
        });
        io.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
}

module.exports = initializeSocket;



const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  io.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


