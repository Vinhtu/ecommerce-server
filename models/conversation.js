var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var conversationSchemas = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

var conversation = mongoose.model("conversation", conversationSchemas);

module.exports = conversation;
