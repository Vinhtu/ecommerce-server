var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var usagestatusSchemas = new Schema({
 
  type: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },

});

var usagestatus = mongoose.model("usagestatus", usagestatusSchemas);

module.exports = usagestatus;
