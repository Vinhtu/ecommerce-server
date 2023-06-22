var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var mailSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
});

var mail = mongoose.model("mail", mailSchemas);

module.exports = mail;
