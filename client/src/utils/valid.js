const valid = ({ fullname, username, email, password, cf_password }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Vui lòng thêm tên đầy đủ của bạn.";
  } else if (fullname.length > 25) {
    err.fullname = "Tên đầy đủ phải nhỏ hơn 25 kí tự.";
  }

  if (!username) {
    err.username = "Vui lòng thêm tên đăng nhập của bạn.";
  } else if (username.replace(/ /g, "").length > 25) {
    err.username = "Tên đăng nhập phải nhỏ hơn 25 kí tự.";
  }

  if (!email) {
    err.email = "Vui lòng thêm email của bạn.";
  } else if (!validateEmail(email)) {
    err.email = "Định dạng email không đúng.";
  }

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

function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
