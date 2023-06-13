import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { changePassword } from "../../redux/actions/authAction";

const ChangePassword = ({ setShowDialogPassword }) => {
  const { auth, alert, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    email: "",
    oldPassword: "",
    newPassword: "",
    cf_newPassword: "",
  };

  const [typeOldPass, setTypeOldPass] = useState(false);
  const [typeNewPass, setTypeNewPass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const [data, setData] = useState(initialState);

  const { email, oldPassword, newPassword, cf_newPassword } = data;
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(data));
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setShowDialogPassword(false)}
      >
        Đóng
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Nhập Email Đăng Ký</label>
          <div className="position-relative">
            <input
              type={"email"}
              className="form-control"
              id="exampleInputEmail1"
              onChange={handleChangeInput}
              value={email}
              name="email"
              style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
            />
            <small>{alert.email ? alert.email : ""}</small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="oldPassword">Nhập Mật Khẩu Cũ</label>
          <div className="position-relative">
            <input
              type={typeOldPass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={oldPassword}
              name="oldPassword"
              style={{ background: `${alert.oldPassword ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypeOldPass(!typeOldPass)}>
              {typeOldPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.oldPassword ? alert.oldPassword : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nhập Mật Khẩu Mới</label>
          <div className="position-relative">
            <input
              type={typeNewPass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={newPassword}
              name="newPassword"
              style={{ background: `${alert.newPassword ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypeNewPass(!typeNewPass)}>
              {typeNewPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.newPassword ? alert.newPassword : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="cf_newPassword">Nhập Lại Mật Khẩu</label>
          <div className="position-relative">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={cf_newPassword}
              name="cf_newPassword"
              style={{
                background: `${alert.cf_newPassword ? "#fd2d6a14" : ""}`,
              }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_newPassword ? alert.cf_newPassword : ""}
          </small>
        </div>

        <button className="btn btn-info w-100" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
