var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var sizeSchemas = new Schema({
  
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  p_price: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  s_amount: {
    type: String,
    require: true,
  },
 
});

var size = mongoose.model("size", sizeSchemas);

module.exports = size;
