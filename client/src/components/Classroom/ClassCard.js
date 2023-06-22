import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
const ClassCard = ({ classroom }) => {
  // console.log({ classroom });
  const { auth } = useSelector((state) => state);
  const handleClickTitle = () => {
    console.log('hello');
  };
  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <Link
          className="joined__title"
          to={`/classroom/${classroom._id}`}
          // state={{ classroomData: classroom }}
        >
          <div className="joined__container">
            <div className="joined__imgWrapper" />
            <div className="joined__image" />
            <div className="joined__content">
              <h2>{classroom.className} </h2>
              <div className="nav-item dropdown">
                <span
                  className="material-icons"
                  id="moreLink"
                  data-toggle="dropdown"
                >
                  more_horiz
                </span>
                <div
                  className="dropdown-menu"
                  style={{ borderRadius: '12px', border: 'none' }}
                >
                  {/* {auth.user._id === post.user._id && (
                    <>
                      <div className="dropdown-item">Chỉnh sửa</div>
                      <div className="dropdown-item">Xoá</div>
                    </>
                  )} */}

                  <>
                    <div className="dropdown-item">Chỉnh sửa</div>
                    <div className="dropdown-item">Xoá</div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="joined__avatar">
          <Avatar src={auth.user.avatar} size="class-avatar" />
        </div>

        <p className="joined__owner" style={{ color: 'black' }}>
          Môn học: Lập trình hướng đối tượng
        </p>
        <p className="joined__owner" style={{ color: 'black' }}>
          Học kì: HKI
        </p>
        <p className="joined__owner" style={{ color: 'black' }}>
          Giảng viên: Trần Thị Dung
        </p>
      </div>
      {/* <div className="joined__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div> */}
    </li>
  );
};

export default ClassCard;
