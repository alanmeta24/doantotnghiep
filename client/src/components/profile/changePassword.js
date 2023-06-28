import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { changePassword } from '../../redux/actions/authAction';

const ChangePassword = ({ setShowDialogPassword }) => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    email: '',
    oldPassword: '',
    newPassword: '',
    cf_newPassword: '',
  };

  const [typeOldPass, setTypeOldPass] = useState(false);
  const [typeNewPass, setTypeNewPass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const [data, setData] = useState(initialState);

  const { email, oldPassword, newPassword, cf_newPassword } = data;
  useEffect(() => {
    if (auth.token) history.push('/');
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
        className="btn btn_close"
        onClick={() => setShowDialogPassword(false)}
      >
        &times;
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img src={auth.user.avatar} alt="avatar" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email dăng ký</label>
          <div className="position-relative">
            <input
              type={'email'}
              className="form-control"
              id="exampleInputEmail1"
              onChange={handleChangeInput}
              value={email}
              name="email"
              style={{
                background: `${alert.email ? '#fd2d6a14' : ''}`,
                borderRadius: '10px',
              }}
            />
            <small>{alert.email ? alert.email : ''}</small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="oldPassword">Nhập mật khẩu cũ</label>
          <div className="position-relative">
            <input
              type={typeOldPass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={oldPassword}
              name="oldPassword"
              style={{
                background: `${alert.oldPassword ? '#fd2d6a14' : ''}`,
                borderRadius: '10px',
              }}
            />
            <small onClick={() => setTypeOldPass(!typeOldPass)}>
              {typeOldPass ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.oldPassword ? alert.oldPassword : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nhập mật khẩu mới</label>
          <div className="position-relative">
            <input
              type={typeNewPass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={newPassword}
              name="newPassword"
              style={{
                background: `${alert.newPassword ? '#fd2d6a14' : ''}`,
                borderRadius: '10px',
              }}
            />
            <small onClick={() => setTypeNewPass(!typeNewPass)}>
              {typeNewPass ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.newPassword ? alert.newPassword : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="cf_newPassword">Nhập lại mật khẩu</label>
          <div className="position-relative">
            <input
              type={typeCfPass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={cf_newPassword}
              name="cf_newPassword"
              style={{
                background: `${alert.cf_newPassword ? '#fd2d6a14' : ''}`,
                borderRadius: '10px',
              }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_newPassword ? alert.cf_newPassword : ''}
          </small>
        </div>

        <button
          className="btn btn-success w-100"
          type="submit"
          style={{
            borderRadius: '10px',
          }}
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
