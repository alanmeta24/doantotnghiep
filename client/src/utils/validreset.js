const validReset = ({ password, cf_password }) => {
  const err = {};

  if (!password) {
    err.password = "Vui lòng thêm mật khẩu của bạn.";
  } else if (password.length < 6) {
    err.password = "Mật khẩu phải từ 6 kí tự trở lên.";
  }

  if (password !== cf_password) {
    err.cf_password = "Mật khẩu không trùng khớp.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export default validReset;
