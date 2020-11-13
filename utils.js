const axios = require("axios");
const https = require("https");

const projectId = process.env.API_KEY;
const projectSecret = process.env.API_SECRET;
const BASE_URL = "https://api.stringee.com/v1/room2/";
var restToken = "resttoken";
async function createRoom() {
  const roomName = Math.random().toFixed(4);
  const config = {
    method: "post",
    url: BASE_URL + "create",
    headers: { "X-STRINGEE-AUTH": restToken },
    data: {
      name: roomName,
      uniqueName: roomName,
    },
  };
  const response = await axios(config);
  console.log(response.data);
  const room = response.data;
  //   console.log({ room });
  return room;
}
async function getRoomToken(roomId) {
  const tokens = await _getToken({ roomId });
  // console.log(roomId);
  return tokens.room_token;
}
async function _getToken({ userId, roomId, rest = true }) {
  const response = await axios.get(
    "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
    {
      params: {
        keySid: projectId,
        keySecret: projectSecret,
        userId,
        roomId,
        rest,
      },
    }
  );

  const tokens = response.data;
  // console.log({ tokens });
  return tokens;
}
// async function _authHeader() {
//   return {
//     "X-STRINGEE-AUTH": restToken,
//   };
// }
// async function listRoom() {
//   const response = await axios.get(`${BASE_URL}/list`, {
//     headers: _authHeader(),
//   });

//   const rooms = response.data.list;
//   console.log({ rooms });
//   return rooms;
// }

// async function deleteRoom(roomId) {
//   const response = await axios.put(
//     `${BASE_URL}/delete`,
//     {
//       roomId,
//     },
//     {
//       headers: _authHeader(),
//     }
//   );

//   console.log({ response });

//   return response.data;
// }

// async function clearAllRooms() {
//   const rooms = await listRoom();
//   const response = await Promise.all(
//     rooms.map((room) => deleteRoom(room.roomId))
//   );

//   return response;
// }

// async function setRestToken() {
//   const tokens = await _getToken({ rest: true });
//   const restToken = tokens.rest_access_token;
//   restToken = restToken;

//   return restToken;
// }

// async function getUserToken(userId) {
//   const tokens = await _getToken({ userId });
//   return tokens.access_token;
// }

// async function getRoomToken(roomId) {
//   const tokens = await _getToken({ roomId });
//   return tokens.room_token;
// }

// async function _getToken({ userId, roomId, rest }) {
//   const response = await axios.get(
//     "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
//     {
//       params: {
//         keySid: projectId,
//         keySecret: projectSecret,
//         userId,
//         roomId,
//         rest,
//       },
//     }
//   );

//   const tokens = response.data;
//   console.log({ tokens });
//   return tokens;
// }

// function isSafari() {
//   const ua = navigator.userAgent.toLowerCase();
//   return !ua.includes("chrome") && ua.includes("safari");
// }

module.exports = {
  createRoom,
  getRoomToken,
};
