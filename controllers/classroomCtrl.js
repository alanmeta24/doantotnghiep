const Classrooms = require('../models/classroomModel');
const Comments = require('../models/commentModel');
const Users = require('../models/userModel');

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

const classroomCtrl = {
  createClassroom: async (req, res) => {
    try {
      const { className, subject, semester } = req.body;

      const newClassroom = new Classrooms({
        className,
        semester,
        subject,
        user: req.user._id,
      });
      await newClassroom.save();

      res.json({
        msg: 'Tạo lớp thành công',
        newClassroom: {
          ...newClassroom._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getClassrooms: async (req, res) => {
    try {
      const features = new APIfeatures(
        Classrooms.find({ user: [...req.user.following, req.user._id] }),
        req.query,
      ).paginating();

      const classrooms = await features.query
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
        result: classrooms.length,
        classrooms,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateClassroom: async (req, res) => {
    try {
      const { className, subject, semester } = req.body;

      const classroom = await Classrooms.findOneAndUpdate(
        { _id: req.params.id },
        {
          className,
          subject,
          semester,
        },
        { new: true },
      );

      res.json({
        msg: 'Cập nhật thành công!',
        newClassroom: {
          ...classroom._doc,
          className,
          subject,
          semester,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getClassroom: async (req, res) => {
    try {
      const classroom = await Classrooms.findById(req.params.id);

      if (!classroom)
        return res.status(400).json({ msg: 'Lớp học không tồn tại.' });

      res.json({
        classroom,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteClassroom: async (req, res) => {
    try {
      const classroom = await Classrooms.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      // await Comments.deleteMany({ _id: { $in: post.comments } });

      res.json({
        msg: 'Đã xoá lớp học!',
        newClassroom: {
          ...classroom,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = classroomCtrl;
