var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const utils = require("./utils");
var db = require("./model/");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED DIT CON ME MAY");
  });
// import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
// var stringeeClient;
// stringeeClient.on("connect", function () {
//   console.log("++++++++++++++ connected to StringeeServer");
// });

// stringeeClient.on("authen", function (res) {
//   console.log("authen", res);
// });

// stringeeClient.on("disconnect", function () {
//   console.log("++++++++++++++ disconnected");
// });
// sstringeeClient = new StringeeClient();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  const clientRoom = getClientRoom();

  socket.join(clientRoom);
  if (io.sockets.adapter.rooms[clientRoom].length < 2) {
    io.in(clientRoom).emit("statusRoom", "Đang chờ người lạ ...");
  } else {
    clientRoom;
    io.in(myRoom).emit("statusRoom", "Người lạ đã vào phòng");
  }

  socket.on("disconnect", (reason) => {
    socket
      .to(clientRoom)
      .emit("statusRoom", "Người lạ đã thoát. Đang chờ người tiếp theo ....");
  });
  socket.emit("USERID", socket.id);
  socket.on("receiveMessage", async (data) => {
    db.addMessage(data.msg);
    let chargeBackData = await db.getAll();
    socket.emit("REFRESHDATA", chargeBackData);
  });
});

http.listen(8679, () => {
  console.log("listening on *:8679");
});
function getClientRoom() {
  let index = 0;
  while (true) {
    if (
      !io.sockets.adapter.rooms[index] ||
      io.sockets.adapter.rooms[index].length < 2
    ) {
      return index;
    }
    index++;
  }
}
