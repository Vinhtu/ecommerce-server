var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var originSchemas = new Schema(
  {
  
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

var origin = mongoose.model("origin", originSchemas);

module.exports = origin;
