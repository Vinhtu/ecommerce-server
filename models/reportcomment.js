var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var reportcommentSchemas = new Schema(
  {
    account_send: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
    },
    account_receive: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
    },
    comment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comment",
    },
    sub_title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    create_date: {
      type: Date,
      require: true,
    },
  },
  { timestamp: true }
);

var reportcomment = mongoose.model("reportcomment", reportcommentSchemas);

module.exports = reportcomment;
