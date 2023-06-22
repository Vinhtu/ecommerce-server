var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var affilateshopSchemas = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
  streetAddress: {
    type: String,
    require: true,
  },
  wardCommunedistrictAddress: {
    type: String,
    require: true,
  },
  cityAddress: {
    type: String,
    require: true,
  },
  zipAddress: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

var affilateshop = mongoose.model("affilateshop", affilateshopSchemas);

module.exports = affilateshop;
