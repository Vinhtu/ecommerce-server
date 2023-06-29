var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var deliverymethodSchemas = new Schema({
 
  type: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },

});

var deliverymethod = mongoose.model("deliverymethod", deliverymethodSchemas);

module.exports = deliverymethod;
