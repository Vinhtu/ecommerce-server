var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var eventitemSchemas = new Schema({
  
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
  p_price: {
    type: String,
    require: true,
  },


});

var eventitem = mongoose.model("eventitem", eventitemSchemas);

module.exports = eventitem;
