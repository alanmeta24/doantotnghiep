const mongoose = require('mongoose');

const classcommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    postclassId: mongoose.Types.ObjectId,
    postclassUserId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('classcomment', classcommentSchema);
