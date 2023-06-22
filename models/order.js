var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var orderSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  orderitem: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "orderitem",
  }],
  t_product_price: {
    type: String,
    require: true,
  },
  t_price: {
    type: String,
    require: true,
  },
  p_price: {
    type: String,
    require: true,
  },
  voucher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "voucher",
  },
  amount: {
    type: String,
    require: true,
  },
  type_pay: {
    type: String,
    require: true,
  },


  province: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  ward: {
    type: String,
    require: true,
  },
  line: {
    type: String,
    require: true,
  },
  zip: {
    type: String,
    require: true,
  },

  
  streetAddress: {
    type: String,
    require: true,
  },
  wardCommunedistrictAddress: {
    type: String,
    require: true,
  },
  cityAddress: {
    type: String,
    require: true,
  },
  zipAddress: {
    type: String,
    require: true,
  },
  t_ship: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  status_pay:{
    type: String,
    require: true,
  }


});

var order = mongoose.model("order", orderSchemas);

module.exports = order;
