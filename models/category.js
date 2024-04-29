const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true},
  })

// Virtual for products's URL
CategorySchema.virtual("url").get(function() {
  return `/catalog/department/${this._id}`});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;