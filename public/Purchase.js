import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  seller: { type: String, required: true },
  category: { type: String, required: true },
  buyerPhone: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Purchase', purchaseSchema);
