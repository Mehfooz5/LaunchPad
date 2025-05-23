import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['founder', 'investor'], required: true },
  contactNo: { type: String }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
