import mongoose from 'mongoose';
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  url: { type: String, required: true}
});



// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// Export model
export default mongoose.model("Item", ItemSchema);