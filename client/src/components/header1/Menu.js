import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import ChangePassword from "../profile/changePassword";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "inbox", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];
  const [showDialogPassword, setShowDialogPassword] = useState(false);
  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              className="material-icons"
              style={{ color: notify.data.length > 0 ? "crimson" : "" }}
            >
              notifications
            </span>

            <span className="notify_length">{notify.data.length}</span>
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(75px)" }}
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
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Thông Tin
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Giao Diện Sáng" : "Giao Diện Tối"}
            </label>
            {/* <Link className="dropdown-item" to="/">
              Đổi Mật Khẩu
            </Link> */}

            <label
              // htmlFor="setShowDialogPassword"
              className="dropdown-item"
              onClick={() => {
                setShowDialogPassword(true);
              }}
            >
              Đổi Mật Khẩu
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Đăng Xuất
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

export default Menu;
