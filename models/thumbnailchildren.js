var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var thumbnailChildrenSchemas = new Schema({
  alt:{
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
});

var thumbnailchildren = mongoose.model("thumbnailchildren", thumbnailChildrenSchemas);

module.exports = thumbnailchildren;
