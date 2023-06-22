var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var suggestion = new Schema({
  name: {
    type: String,
    require: true,
  },
  brand:{
    type: String,
    require: true,
  },
  owner:{
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
