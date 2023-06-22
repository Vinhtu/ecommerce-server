var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var teamSchemas = new Schema({

  name: {
    type: String,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
});

var team = mongoose.model("team", teamSchemas);

module.exports = team;
