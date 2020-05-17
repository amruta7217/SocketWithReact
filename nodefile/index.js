const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // emit an event to the socket
  //   io.emit("broadcast" /* … */) // emit an event to all connected sockets

  socket.on("data-sent", (data) => {
    console.log("received");
    console.log(data);
    //setTimeout(() => {
    io.emit("new-data", data);
    //}, 2000);
  }); // listen to the event
});
server.listen(4000);
console.log("server running");
