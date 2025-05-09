import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  { timestamps: true }
);

export const Conversation = mongoose.model('Conversation', conversationSchema);
