var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var accountSchemas = new Schema({
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  phone: {
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
  role: {
    type: String,
    require: true,
  },
  team: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  b_price: {
    type: String,
    require: true,
  },
  voucher: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "voucher",
  }],
  create_date: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },

  payment:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "payment",
  }]

});

var account = mongoose.model("account", accountSchemas);

module.exports = account;
