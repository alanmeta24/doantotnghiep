import { Link } from 'react-router-dom';
import UTC2 from '../../assets/images/uct2.png';
import React from 'react';
import HeaderMenu from './HeaderMenu';
import HeaderRight from './HeaderRight.js.js';

const Header = () => {
  return (
    <div className="header">
      <div className="header_left">
        <Link to="/" className="logo">
          <img src={UTC2} alt="" />
        </Link>
        <Link className="header-link" to="/">
          <p className="header-title">E-Learning</p>
        </Link>
      </div>
      <HeaderMenu />

      <HeaderRight />
    </div>
  );
};
export default Header;
