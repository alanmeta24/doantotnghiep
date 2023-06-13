import React from 'react';
import { Link } from 'react-router-dom';
import MenuRight from '../Header/HeaderRight.js.js';
import UTC2 from '../../assets/images/uct2.png';

const HeaderDetail = ({ classroom }) => {
  return (
    <div className="header">
      <div className="header_left">
        <Link to="/" className="logo">
          <img src={UTC2} alt="" />
        </Link>
        <Link className="header-link" to="/">
          <p className="header-title"> {classroom.className}</p>
        </Link>
      </div>

      <ul className="menu">
        <li className="menu-item">
          <Link to={`/classroom/${classroom._id}`} className="btn menu-link">
            Bảng tin
          </Link>
        </li>

        <li className="menu-item">
          <Link to={`/exercise`} className="btn menu-link">
            Bài tập
          </Link>
        </li>
        <li className="menu-item">
          <Link to={`/members`} className="btn menu-link">
            Thành viên
          </Link>
        </li>
      </ul>

      {/* <MenuRight /> */}
    </div>
  );
};

export default HeaderDetail;
