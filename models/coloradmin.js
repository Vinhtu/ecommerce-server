var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var coloradminSchemas = new Schema({
  name: {
    type: String,
    require: true,
  },


  create_date: {
    type: Date,
    require: true,
  },
 


  
});

var coloradmin = mongoose.model("coloradmin", coloradminSchemas);

module.exports = coloradmin;
