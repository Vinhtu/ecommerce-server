var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var positionSchemas = new Schema({
  name: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
});

var position = mongoose.model("position", positionSchemas);

module.exports = position;
