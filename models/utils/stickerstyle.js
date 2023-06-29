var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var stickerstyleSchemas = new Schema(
  {
    category: {
      type: String,
      require: true,
    },
    subcategory: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

var stickerstyle = mongoose.model("stickerstyle", stickerstyleSchemas);

module.exports = stickerstyle;
