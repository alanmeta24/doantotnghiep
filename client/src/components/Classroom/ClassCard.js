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
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />

          <div className="joined__content">
            <Link
              className="joined__title"
              to={`/classroom/${classroom._id}`}
              // state={{ classroomData: classroom }}
            >
              <h2>{classroom.className} </h2>
            </Link>
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

        <div className="joined__avatar">
          <Avatar src={auth.user.avatar} size="class-avatar" />
        </div>

        <div className="text_title">
          {/* <p className="joined__owner sub" style={{ color: 'black' }}>
            Lớp học: {classroom.className}
          </p> */}
          <p className="joined__owner sub" style={{ color: 'black' }}>
            Môn học: {classroom.subject}
          </p>
          <p className="joined__owner" style={{ color: 'black' }}>
            Học kì: HKI
          </p>
          <p className="joined__owner" style={{ color: 'black' }}>
            Giảng viên: {auth.user.fullname}
          </p>
        </div>
      </div>
      {/* <div className="joined__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div> */}
    </li>
  );
};

export default ClassCard;
