const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    semester: { type: String, default: 'Học kì 1' },

    role: { type: String, default: 'user' },
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    members: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('classroom', classSchema);
