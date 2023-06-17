import React from 'react';
import { Link } from 'react-router-dom';
import MenuRight from '../Header/HeaderRight.js.js';
import UTC2 from '../../assets/images/uct2.png';

const HeaderDetail = ({ classroom }) => {
  return (
    <div className="header_detail">
      {/* <div className="header_left">
        <Link to="/" className="logo">
          <img src={UTC2} alt="" />
        </Link>
        <Link className="header-link" to="/">
          <p className="header-title"> {classroom.className}</p>
        </Link>
      </div> */}

      <div className="header_control menu">
        <Link to={`/classroom/${classroom._id}`} className="btn header-link">
          Bảng tin
        </Link>

        <Link to={`/exercise`} className="btn header-link">
          Bài tập
        </Link>

        <Link to={`/members`} className="btn header-link">
          Thành viên
        </Link>
      </div>

      {/* <MenuRight /> */}
    </div>
  );
};

export default HeaderDetail;
