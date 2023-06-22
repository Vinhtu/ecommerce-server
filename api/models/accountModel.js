var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var accountSchema = new Schema({
  fullname: String,
  username: String,
  password: String,
  city: String,
  code_city: String,
  county: String,
  code_county: String,
  commune: String,
  code_commune: String,
  address: String,
  role: String,
  location: String,
  status: String,
  status_run: String,
  date_create: String,
  date_start:String,
  date_end: String,
  


});

var account = mongoose.model("accounts", accountSchema);

module.exports = account;
