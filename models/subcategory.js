var mongoose = require("mongoose"); //chua cac truong thuoc tinh

var Schema = mongoose.Schema;

var subcategorySchemas = new Schema({
 
  name: {
    type: String,
    require: true,
  },
 
  brand: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"brand",
    },
  ],
 

});

var subcategory = mongoose.model("subcategory", subcategorySchemas);

module.exports = subcategory;
