import mongoose from 'mongoose';

const founderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: {type: String, required: true},
  bio: {type: String, required: true},
  websiteUrl: String,
<<<<<<< HEAD
  BusinessNumber: String,
=======
  BussinessNumber: {type: String, required: true},
>>>>>>> 6f1ea110a734793dc707796422708f2f5cf65695
}, { timestamps: true });

export const Founder = mongoose.model('Founder', founderSchema);
