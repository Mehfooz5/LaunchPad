import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  organizationName: String,
  bio: String,
  type: { type: String, enum: ['Angel', 'VC', 'Institutional', 'Incubator', 'Other'] },
  preferredDomain: String,
  linkedin: String
}, { timestamps: true });

export const Investor = mongoose.model('Investor', investorSchema);
