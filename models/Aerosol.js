var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var productSchemas = new Schema({
  code: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  video: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  qr: {
    type: String,
    require: true,
  },
  affilateshop: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "affilateshop",
  },
  create_date: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  // rate: {
  //   type: String,
  //   require: true,
  // },
  t_amount: {
    type: String,
    require: true,
    default: "0",
  },
  amount_sale: { type: Number, require: true, default: 0 },
  amount_rate: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "rate",
    },
  ],
  thumbnail_children: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "thumbnailchildren",
    },
  ],
  color: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "color",
    },
  ],
  description: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "description",
    },
  ],
  comment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comment",
    },
  ],

  evaluate: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "evaluate",
    },
  ],
});

var product = mongoose.model("product", productSchemas);

module.exports = product;
