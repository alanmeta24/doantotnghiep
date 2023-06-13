import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LogoUTC2 from '../assets/images/uct2.png';
import Helmet from '../components/Helmet';
import { forgotPassword } from '../redux/actions/authAction';
const ForgotPassword = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    email: '',
  };

  const [data, setData] = useState(initialState);

  const { email } = data;
  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setData({ ...data });
    dispatch(forgotPassword(data));
  };

  return (
    <Helmet title="Quên mật khẩu">
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
              Đăng nhập email để xác thực
            </h5>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                onChange={handleChangeInput}
                value={email}
                style={{
                  background: `${alert.email ? '#fd2d6a14' : ''}`,
                  borderRadius: '10px',
                }}
                placeholder="Email..."
              />
              <small className="form-text text-danger">
                {alert.email ? alert.email : ''}
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100"
              style={{ borderRadius: '8px' }}
            >
              Xác Thực Email
            </button>
            <p className="my-2">
              <Link to="/" style={{ color: '#0075FF' }}>
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default ForgotPassword;
