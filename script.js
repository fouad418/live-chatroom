const socket = io();

function joinChat() {
  const username = document.getElementById("username").value;
  const room = document.getElementById("room").value;

  if (!username || !room) return;

  socket.emit("joinRoom", { username, room });

  document.getElementById("join").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

function sendMsg() {
  const msg = document.getElementById("msg").value;
  socket.emit("chatMessage", msg);
  document.getElementById("msg").value = "";
}

socket.on("message", (data) => {
  const msg = document.createElement("div");
  msg.classList.add("message");

  msg.innerHTML = `
    <div class="user">${data.user}</div>
    <div class="text">${data.text}</div>
  `;

  const messages = document.getElementById("messages");
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
});
