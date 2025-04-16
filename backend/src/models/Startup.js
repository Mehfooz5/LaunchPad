import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Founder', required: true },
  title: { type: String, required: true },
  domain: { type: String, enum: ['medical', 'agriculture', 'tech', 'education'], required: true },
  stage: { type: String, enum: ['Idea', 'Prototype', 'MVP', 'Revenue'], required: true },
  location: String,
  description: String,
  startupPdf: String,
  pitch: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
}, { timestamps: true });

export const Startup = mongoose.model('Startup', startupSchema);
