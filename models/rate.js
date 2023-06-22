var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var rateSchemas = new Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
  body: {
    type: String,
    require: true,
  },
  n_like: {
    type: Number,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },

});

var rate = mongoose.model("rate", rateSchemas);

module.exports = rate;
