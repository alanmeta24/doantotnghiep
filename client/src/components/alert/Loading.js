import React from 'react';
import UTC2 from '../../assets/images/uct2.png';
const Loading = () => {
  return (
    <div className="position-fixed w-100 h-100 text-center loading">
      <svg>
        <circle cx="150" cy="150" r="100"></circle>
        <circle cx="150" cy="150" r="80"></circle>
      </svg>

      <text fill="#fff" x="5" y="47">
        <img src={UTC2} alt="" />
      </text>
    </div>
  );
};

export default Loading;
