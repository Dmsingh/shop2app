const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Status > 0:Pending ; 1:Working ; 2:Done 

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0,
    trim: true
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  // photo: {
  //   data: Buffer,
  //   contentType: String
  // }

}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema)