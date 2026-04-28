import mongoose from 'mongoose';

const lostAndFoundItemSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['lost', 'found'] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('LostAndFoundItem', lostAndFoundItemSchema);
