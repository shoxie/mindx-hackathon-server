var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const utils = require("./utils");
var db = require("./model/");
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const {
  teacherLogin,
  teacherGetCourses,
  deleteCourse,
  createTeacher,
} = require("./api/index.js");
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
// console.log(teacherGetCourses().data.data);
io.on("connection", async (socket) => {
  socket.emit("USERID", socket.id);
  let courses = await axios.get(
    "https://5fae34c963e40a0016d896b2.mockapi.io/courses"
  );
  socket.emit("COURSES", courses.data);
  socket.on("messageSent", async (msg) => {
    db.addMessage(msg);
    let chargeBackData = await db.getAll();
    socket.emit("REFRESHDATA", chargeBackData);
  });
  socket.on("login", async (data) => {
    // console.log(data);
    let users = await axios.get(
      "https://5fae34c963e40a0016d896b2.mockapi.io/users"
    );

    for (let i = 0; i < users.data.length; i++) {
      if (
        users.data[i].username === data.username &&
        users.data[i].password === data.password
      ) {
        socket.emit("LOGIN", true);
        break;
      }
    }
  });
});

http.listen(8679, () => {
  console.log("listening on *:8679");
});
