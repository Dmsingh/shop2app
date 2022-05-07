const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
    products: {
      type: Object,
      require: true,
      trim: true
    },
 
  
  }, { timestamps: true });
  
  module.exports = mongoose.model("shopifyProduct", ProductSchema)