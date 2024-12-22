import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.emit("SERVER_SEND_SOCKET_ID", socket.id);

  socket.on("CLIENT_SEND_MESSAGE", (msg) => {
    console.log("Received message from client:", msg);
    // Optionally, broadcast the message to all clients

    // khi a gui len server, server chi phan hoi cho a

    // ví dụ gửi tin nhắn bị lỗi thì chỉ thông báo trả vè cho A
    // socket.emit("SERVER_BROADCAST_MESSAGE", msg);

    // khi a gui len server, server phan hoi cho tat ca
    // ví dụ: tính năng chat theo nhóm
    io.emit("SERVER_BROADCAST_MESSAGE", msg);

    // khi a gui len server, server gui cho B,C khong gui A

    // ví dụ: cá nhân, chat cá nhân kết bạn
    socket.broadcast.emit("SERVER_BROADCAST_MESSAGE", msg);
  });
});

// Xử lý đường dẫn của index.html
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
