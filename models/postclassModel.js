const mongoose = require('mongoose');

const postclassSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      nullable: true,
    },

    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('postclass', postclassSchema);
