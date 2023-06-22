var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var shipSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  p_ship: {
    type: String,
    require: true,
  },
  t_ship: {
    type: String,
    require: true,
  },
});

var ship = mongoose.model("ship", shipSchemas);

module.exports = ship;
