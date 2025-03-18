const socketIo = require("socket.io");

let io;
const initSocket = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("\x1b[34m%s\x1b[0m", "Usuario conectado");
    
    socket.on("disconnect", () => {
      console.log("\x1b[31m%s\x1b[0m", "Usuario desconectado");
    });
  });
};

const getIo = () => {
  if(!io) throw new Error("Socket.io no esta inicializado");

  return io;
};

module.exports = {
  initSocket,
  getIo
};