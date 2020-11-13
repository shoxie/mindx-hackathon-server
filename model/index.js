var mongoose = require("mongoose");
const schema = mongoose.Schema({
  message: {
    type: String,
  },
});

var message = mongoose.model("message", schema);

async function addMessage(msg) {
  let newmsg = new message({
    message: msg,
  });
  await newmsg.save();
}
async function getAll() {
  return message.find();
}

module.exports = {
  addMessage,
  getAll,
};
