const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// Virtual for products's URL
ProductSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

// Export model
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;