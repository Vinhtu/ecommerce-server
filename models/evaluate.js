var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var evaluateSchemas = new Schema({
  star: {
    type: String,
    require: true,
  },
  account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account",
  },
  create_date:{
    type: Date,
    require: true,
  }
 
});

var evaluate = mongoose.model("evaluate", evaluateSchemas);

module.exports = evaluate;
