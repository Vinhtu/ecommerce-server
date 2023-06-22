var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var replycommentSchemas = new Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  comment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "comment",
  },
  body: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
});

var replycomment = mongoose.model("replycomment", replycommentSchemas);

module.exports = replycomment;
