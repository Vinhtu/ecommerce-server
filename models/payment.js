var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var paymentSchemas = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    name_bank: {
      type: String,
      require: true,
    },
    number_card: {
      type: String,
      require: true,
    },
    number_account: {
      type: String,
      require: true,
    },
    cvv: {
      type: String,
      require: true,
    },
    data_start_card: {
      type: String,
      require: true,
    },
    data_end_card: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

var payment = mongoose.model("payment", paymentSchemas);

module.exports = payment;
