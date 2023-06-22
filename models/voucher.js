var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var voucherSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  p_price: {
    type: String,
    require: true,
  },
  percent: {
    type: String,
    require: true,
  },
  date_start: {
    type: String,
    require: true,
  },
  date_end: {
    type: Date,
    require: true,
  },
  body: {
    type: Date,
    require: true,
  },
  amount: { type: String, require: true },
  status: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
});

var voucher = mongoose.model("voucher", voucherSchemas);

module.exports = voucher;
