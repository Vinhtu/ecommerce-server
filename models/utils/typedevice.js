var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var typedeviceSchemas = new Schema(
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

var typedevice = mongoose.model("typedevice", typedeviceSchemas);

module.exports = typedevice;
