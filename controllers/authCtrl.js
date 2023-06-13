const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const catchAsyncError = require('../middleware/catchAsyncError');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');

const { CLIENT_URL } = process.env;

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, '');

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: 'Tên đăng nhập này đã tồn tại.' });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: 'Email nãy đã tồn tại.' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Mật khẩu phải có ít nhất 6 kí tự.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      sendMail(email, CLIENT_URL, 'Đăng ký thành công');

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: 'Đăng ký thành công!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        'avatar username fullname followers following',
      );

      if (!user)
        return res.status(400).json({ msg: 'Email này chưa được đăng ký.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Mật khẩu không chính xác.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: 'Đăng nhập thành công!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'Email chưa được đăng ký.' });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/reset/${access_token}`;

      sendMail(email, url, 'Đặt lại mặt khẩu của bạn');
      res.json({ msg: 'Vui lòng kiểm tra email.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        },
      );

      res.json({ msg: 'Đổi mặt khẩu thành công!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        'avatar username fullname followers following',
      );
      if (!user)
        return res.status(400).json({ msg: 'Email này chưa được đăng ký.' });

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Mật khẩu cũ không chính xác.' });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ msg: 'Mật khẩu phải có ít nhất 6 kí tự.' });

      const passwordHash = await bcrypt.hash(newPassword, 12);

      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          password: passwordHash,
        },
      );

      res.json({ msg: 'Đổi mặt khẩu thành công!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Đăng xuất thành công!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'Vui lòng đăng nhập.' });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: 'Vui lòng đăng nhập.' });

          const user = await Users.findById(result.id)
            .select('-password')
            .populate(
              'followers following',
              'avatar username fullname followers following',
            );

          if (!user) return res.status(400).json({ msg: 'Không tồn tại.' });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        },
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get all users(admin)
  getAllUser: catchAsyncError(async (req, res, next) => {
    const users = await User.find({ role: 'User' });

    res.status(200).json({
      success: true,
      users,
    });
  }),

  // Get single user (admin)
  getSingleUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`Người dùng không tồn tại với Id: ${req.params.id}`),
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }),

  // update User Role -- Admin
  updateUserRole: catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }),

  // Delete User --Admin
  deleteUser: catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(
          `Người dùng không tồn tại với Id: ${req.params.id}`,
          400,
        ),
      );
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    // const orders = await Order.find({ user: req.params.id });

    // if (orders.length > 0) {
    //   await orders.map(async (order) => {
    //     await order.remove();
    //   });
    // }

    await user.remove();

    res.status(200).json({
      success: true,
      message: 'Xoá  người dùng thành công!',
    });
  }),
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = authCtrl;
