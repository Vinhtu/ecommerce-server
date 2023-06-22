var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var eventSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  eventitem: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "eventitem",
  }],
  amount_product: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
  date_start:{
    type: Date,
    require: true,
  },
  date_end:{
    type: Date,
    require: true,
  },
  status:{
    type: String,
    require: true,
  }



});

var event = mongoose.model("event", eventSchemas);

module.exports = event;
