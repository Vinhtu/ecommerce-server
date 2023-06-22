var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var cartSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  cartitem: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "cartitem",
  }],
  amount: {
    type: String,
    require: true,
    default: 0
  },
  t_price: {
    type: String,
    require: true,
    default: "0"
  },
  create_date: {
    type: Date,
    require: true,
  },
  t_ship:{
    type: String,
    require: true,
    default: "0"
  }


});

var cart = mongoose.model("cart", cartSchemas);

module.exports = cart;
