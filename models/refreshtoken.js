var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var refreshtokenSchemas = new Schema({
  refreshname: {
    type: String,
    require: true,
  },
 
});

var refreshtoken = mongoose.model("refreshtoken", refreshtokenSchemas);

module.exports = refreshtoken;
