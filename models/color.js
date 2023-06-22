var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var colorSchemas = new Schema({
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  size: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "size",
  }],

  
});

var color = mongoose.model("color", colorSchemas);

module.exports = color;
