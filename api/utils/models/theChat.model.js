const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chats = new Schema(
  {
    from: {
      type: String
    },
    room: {
      type: String
    },
    text: {
      type: String
    }
  },
  {
    collection: 'theChat',
    timestamps: true
  }
);


module.exports = mongoose.model("Chats", Chats);