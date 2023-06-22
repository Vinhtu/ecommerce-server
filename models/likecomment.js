var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var likecommentSchemas = new Schema({
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  create_date: {
    type: Date,
    require: true,
  },
  

  
});

var likecomment = mongoose.model("likecomment", likecommentSchemas);

module.exports = likecomment;
