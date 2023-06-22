var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var cartItemSchemas = new Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
  color: {
    type: String,
    require: true,
  },
  size:{
    type: String,
    require: true,
  },
  price:{
    type: String,
    require: true,
  },
  amount:{
    type: Number,
    require: true,
  },
  ship:{
    type: String,
    require: true,
  },
  ship_start:{
    type: Date,
    require: true,
  },
  ship_end:{
    type: Date,
    require: true,
  },
  note:{
    type: String,
    require: true,
  },


});

var cartitem = mongoose.model("cartitem", cartItemSchemas);

module.exports = cartitem;
