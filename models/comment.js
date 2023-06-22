var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var commentSchemas = new Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
  replycomment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "replycomment",
    },
  ],
  reportcomment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "reportcomment",
  },

  body: {
    type: String,
    require: true,
  },
  n_like: {
    type: String,
    require: true,
    default: "0",
  },
  likecomment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "likecomment",
    },
  ],
  create_date: {
    type: Date,
    require: true,
  },
});

var comment = mongoose.model("comment", commentSchemas);

module.exports = comment;
