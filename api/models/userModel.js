var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var userSchemas = new Schema({
  fullname: String,
  avatar: String,
  username: String,
  password: String,
  number_phone: String, 
  address: String,
  describe: String,
  location: String,
  position: String,
  isDone: Boolean,
});

var users = mongoose.model("users", userSchemas);

module.exports = users;
