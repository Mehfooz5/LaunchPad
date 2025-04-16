import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true }
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);
