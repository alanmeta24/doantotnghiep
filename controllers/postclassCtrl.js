const Postclassrooms = require('../models/postclassModel');
const Classrooms = require('../models/classroomModel');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postclassCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      // if (images.length === 0)
      //   return res.status(400).json({ msg: 'Vui lòng thêm ảnh của bạn.' });

      const newPostclass = new Postclassrooms({
        content,
        images,
        user: req.user._id,
      });
      await newPostclass.save();

      res.json({
        msg: 'Created Post!',
        newPostclass: {
          ...newPostclass._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Postclassrooms.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query,
      ).paginating();

      const postclassrooms = await features.query
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

      res.json({
        msg: 'Thành công!',
        result: postclassrooms.length,
        postclassrooms,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const postclassroom = await Postclassrooms.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        },
      )
        .populate('user likes', 'avatar username fullname')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

      res.json({
        msg: 'Cập nhật thành công!',
        newPostclass: {
          ...postclassroom._doc,

          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: 'Bạn đã thích bài đăng này.' });

      const like = await Postclassrooms.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true },
      );

      if (!like)
        return res.status(400).json({ msg: 'Bài đăng không tồn tại.' });

      res.json({ msg: 'Đã thích bài đăng!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true },
      );

      if (!like)
        return res.status(400).json({ msg: 'Bài đăng không tồn tại.' });

      res.json({ msg: 'Đã bỏ thích bài đăng!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Postclassrooms.find({ user: req.params.id }),
        req.query,
      ).paginating();
      const postclassrooms = await features.query.sort('-createdAt');

      res.json({
        postclassrooms,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const postclassroom = await Postclassrooms.findById(req.params.id)
        .populate('user likes', 'avatar username fullname followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        });

      if (!postclassroom)
        return res.status(400).json({ msg: 'Bài đăng không tồn tại.' });

      res.json({
        postclassroom,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPostsDicover: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 9;

      const postclassrooms = await Postclassrooms.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      return res.json({
        msg: 'Thành công!',
        result: postclassrooms.length,
        postclassrooms,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const postclassroom = await Postclassrooms.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await Comments.deleteMany({ _id: { $in: postclassroom.comments } });

      res.json({
        msg: 'Đã xoá bài đăng!',
        newPostclass: {
          ...postclassroom,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0)
        return res.status(400).json({ msg: 'Bạn đã lưu bài đăng này.' });

      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { saved: req.params.id },
        },
        { new: true },
      );

      if (!save)
        return res.status(400).json({ msg: 'Người dùng  không tồn tại.' });

      res.json({ msg: 'Đã lưu bài đăng!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unSavePost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { saved: req.params.id },
        },
        { new: true },
      );

      if (!save)
        return res.status(400).json({ msg: 'Người dùng không tồn tại.' });

      res.json({ msg: 'Đã bỏ lưu bài đăng!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Postclassrooms.find({
          _id: { $in: req.user.saved },
        }),
        req.query,
      ).paginating();

      const savePosts = await features.query.sort('-createdAt');

      res.json({
        savePosts,
        result: savePosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postclassCtrl;
