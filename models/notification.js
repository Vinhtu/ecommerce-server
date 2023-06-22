var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var notificationSchemas = new Schema(
  {
    code: {
      type: String,
      require: true,
    },
    account_send: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
    },
    account_receive: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
    },
    title: {
      type: String,
      require: true,
    },
    sub_title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  
  },
  {
    timestamp: true,
  }
);

var notification = mongoose.model("notification", notificationSchemas);

module.exports = notification;
