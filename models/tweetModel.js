const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    classroomId: mongoose.Types.ObjectId,
    classroomUserId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('tweet', tweetSchema);
