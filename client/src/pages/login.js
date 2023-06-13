import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoUTC2 from '../assets/images/uct2.png';
import Helmet from '../components/Helmet';
import { login } from '../redux/actions/authAction';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <Helmet title="Đăng nhập">
      <div className="auth">
        <div className="auth_page">
          <div className="auth_page-title">
            <img className="logo-about" src={LogoUTC2}></img>
            <div className="auth-content">
              <p>UTC2 E-Learning</p>
              <h5>
                giúp đơn giản hóa công tác giảng dạy và học tập trực tuyến dành
                cho giảng viên và sinh viên.
              </h5>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="auth-form">
            <div className="auth-logo">
              <img className="logo-form" src={LogoUTC2}></img>
            </div>
            <h5 className="text-center mb-2" style={{ color: '#000' }}>
              Đăng nhập để truy cập vào hệ thống
            </h5>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                aria-describedby="emailHelp"
                onChange={handleChangeInput}
                value={email}
                style={{ borderRadius: '8px' }}
                placeholder="Email..."
              />
            </div>
            <div className="form-group">
              <div className="pass">
                <input
                  type={typePass ? 'text' : 'password'}
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                  style={{ borderRadius: '8px' }}
                  placeholder="Mật khẩu..."
                />
                <small onClick={() => setTypePass(!typePass)}>
                  {typePass ? 'Ẩn' : 'Hiện'}
                </small>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-login btn-warning w-100"
              disabled={email && password ? false : true}
            >
              Đăng Nhập
            </button>
            <div className="forgot-pass">
              <Link to="/forgot_password">Quên Mật Khẩu?</Link>
            </div>
            <div className="auth-footer">
              <p>Nếu chưa có tài khoản? </p>
              <Link to="/register"> Đăng ký</Link>
            </div>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Login;
