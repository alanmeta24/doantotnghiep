const Tweets = require('../models/tweetModel');
const Classrooms = require('../models/classroomModel');

const tweetCtrl = {
  createTweet: async (req, res) => {
    try {
      const { classroomId, content, classroomUserId } = req.body;

      const classroom = await Classrooms.findById(classroomId);
      if (!classroom)
        return res.status(400).json({ msg: 'Bài đăng không tồn tại.' });

      const newTweet = new Tweets({
        user: req.user._id,
        content,
        classroomUserId,
        classroomId,
      });

      await Classrooms.findOneAndUpdate(
        { _id: classroomId },
        {
          $push: { tweets: newTweet._id },
        },
        { new: true },
      );

      await newTweet.save();

      res.json({ newTweet });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTweet: async (req, res) => {
    try {
      const { content } = req.body;

      await Tweets.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content },
      );

      res.json({ msg: 'Cập nhật thành công!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteTweet: async (req, res) => {
    try {
      const tweet = await Tweets.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { classroomUserId: req.user._id }],
      });

      await Classrooms.findOneAndUpdate(
        { _id: tweet.classroomId },
        {
          $pull: { tweets: req.params.id },
        },
      );

      res.json({ msg: 'Đẫ xoá bình luận!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = tweetCtrl;
