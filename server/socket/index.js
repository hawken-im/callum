const SocketIo = require('socket.io');

let io;

const init = (server) => {
  io = SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    }
  });
  io.on("connection", (socket) => {
    socket.emit('connected', 'socket connected');
  });
}

module.exports = {
  init,
  getSocketIo: () => io,
};
