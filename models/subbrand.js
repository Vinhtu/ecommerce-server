var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var subbrandSchemas = new Schema({
  name: {
    type: String,
    require: true,
  },

  create_date: {
    type: String,
    require: true,
  },
});

var subbrand = mongoose.model("subbrand", subbrandSchemas);

module.exports = subbrand;
