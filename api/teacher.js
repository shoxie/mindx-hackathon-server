const axios = require("axios");
var token;
var teacheLoginApi = "http://139.180.139.221:2500/teacher/login";
var teacheCreateApi = "http://139.180.139.221:2500/teacher/create";
var courseDeleteApi = "http://139.180.139.221:2500/course";
var listCourseApi = "http://139.180.139.221:2500/teacher/listCourse";
async function teacherLogin(username, password) {
  let options = {
    url: teacheLoginApi,
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      username: username,
      password: password,
    },
  };
  let a = await axios(options);
  console.log(a.data);
  token = a.data.data;
}
async function teacherCreate(username, fullname, password) {
  let options = {
    url: teacheCreateApi,
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      username: username,
      fullname: fullname,
      password: password,
    },
  };
  let a = await axios(options);
  console.log(a);
}
async function getAllCourses() {
  let options = {
    url: listCourseApi,
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  };
  let a = await axios(options);
  console.log(a.data);
}
async function courseDelete(id) {
  let options = {
    url: courseDeleteApi,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      id: id,
    },
  };
  let a = await axios(options);
  console.log(a);
}
module.exports = {
  teacherLogin,
  courseDelete,
  teacherCreate,
  getAllCourses,
};
