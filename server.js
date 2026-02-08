const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    socket.to(room).emit("message", {
      user: "System",
      text: `${username} joined the room`
    });
  });

  socket.on("chatMessage", (msg) => {
    io.to(socket.room).emit("message", {
      user: socket.username,
      text: msg
    });
  });

  socket.on("disconnect", () => {
    if (socket.room) {
      socket.to(socket.room).emit("message", {
        user: "System",
        text: `${socket.username} left the room`
      });
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
