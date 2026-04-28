import mongoose from 'mongoose';

const marketplaceItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('MarketplaceItem', marketplaceItemSchema);
