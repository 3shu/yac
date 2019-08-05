const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    },
    nickname: {
      type: String
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
);


module.exports = mongoose.model("Users", Users);