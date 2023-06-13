import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import Avatar from '../Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChangePassword from '../profile/changePassword';
import NotifyModal from '../NotifyModal';

const MenuRight = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [openCreateClass, setOpenCreateClass] = useState(false);

  const [showDialogPassword, setShowDialogPassword] = useState(false);
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <div className="menu-right">
      <ul className="navbar-nav flex-row">
        <li className="menu-middle-item menu-middle-item_bell">
          <NotificationsIcon
            style={{
              fontSize: 'inherit',
              color: '#002f77',
              marginRight: '5px',
            }}
          />

          <span
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(60px)', border: 'none' }}
          >
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth?.user.avatar} size="medium-avatar" />
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ border: 'none' }}
          >
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Thông tin cá nhân
            </Link>

            <label
              className="dropdown-item"
              onClick={() => {
                setShowDialogPassword(true);
              }}
            >
              Đổi mật khẩu
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Đăng xuất
            </Link>
          </div>
        </li>
      </ul>
      {showDialogPassword && (
        <ChangePassword setShowDialogPassword={setShowDialogPassword} />
      )}
    </div>
  );
};

export default MenuRight;
