import mongoose from 'mongoose';

const founderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: String,
  bio: String,
  websiteUrl: String,
  BusinessNumber: String,
}, { timestamps: true });

export const Founder = mongoose.model('Founder', founderSchema);
