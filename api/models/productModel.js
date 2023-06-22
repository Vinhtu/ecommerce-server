var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var products = new Schema({
  name_owner: String,
  number_owner: String,
  name: String,
  type_product: String,
  area: String,
  widthHeight: String,
  num_facade: String,
  des_facade: String,
  location: String,
  city: String,
  code_city: String,
  county: String,
  code_county: String,
  commune: String,
  code_commune: String,
  numLotSheet: String,
  address: String,
  negotiable_price: String,
  fixed_price: String,
  rose: String,
  describe: String,
  select_master: String,
  name_middleman: String,
  number_middleman: String,
  adress_middleman: String,
  rose_middleman: String,
  describe_middleman: String,
  image: Object,
  image_book: Object,
  image_draw: Object,
  date_time: String,
  status: String,
  user: String,
  info_middleman: {
    name_middleman: String,
    number_middleman: String,
    adress_middleman: String,
    rose_middleman: String,
    describe_middleman: String,
  },
  info_buyer: {
    type: Object,
    name_buyer: String,
    phone_buyer: String,
    address_buyer: String,
    price_buy: String,
    describe_buy: String,
  },
});

var product = mongoose.model("products", products);

module.exports = product;
