const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true},
  })

CategorySchema.virtual('url').get(function() {
    `/catalog/category/${this.id}`});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;