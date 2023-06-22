var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var descriptionSchemas = new Schema({
  alt: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

var description = mongoose.model("description", descriptionSchemas);

module.exports = description;
