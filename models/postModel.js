const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    classroomId: mongoose.Types.ObjectId,
    classroomUserId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('post', postSchema);
