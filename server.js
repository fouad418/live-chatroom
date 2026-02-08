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
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

