var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var categorySchemas = new Schema({
 
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  subcategory: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"subcategory",
    },
  ],
  show: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
});

var category = mongoose.model("category", categorySchemas);

module.exports = category;
