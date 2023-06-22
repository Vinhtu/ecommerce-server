var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var sizeadminSchemas = new Schema({
  
  name: {
    type: String,
    require: true,
  },
    
  create_date: {
    type: Date,
    require: true,
  },
 
 
});

var sizeadmin = mongoose.model("sizeadmin", sizeadminSchemas);

module.exports = sizeadmin;
