var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var bannerSchemas = new Schema({

  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  show: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
});

var banner = mongoose.model("banner", bannerSchemas);

module.exports = banner;
