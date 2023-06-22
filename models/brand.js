var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var brandSchemas = new Schema({
  category: {
    type: String,
    require: true,
  },
  subcategory: {
    type: String,
    require: true,
  },

  subbrand: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"subbrand",
    },
  ],

  create_date: {
    type: String,
    require: true,
  },
});

var brand = mongoose.model("brand", brandSchemas);

module.exports = brand;
