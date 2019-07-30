const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const user = new Schema({
  name: String,
  email: String,
  username: String,
  auth0_id: String
});

module.exports = mongoose.model("User", user);
