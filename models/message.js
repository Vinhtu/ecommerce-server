var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var messageSchemas = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "account",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var message = mongoose.model("message", messageSchemas);

module.exports = message;
