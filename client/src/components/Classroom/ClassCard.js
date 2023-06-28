import React from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { deleteClassroom } from '../../redux/actions/classroomAction';
const ClassCard = ({ classroom }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS_CLASS,
      payload: { ...classroom, onEdit: true },
    });
  };
  const handleDeletePost = () => {
    if (window.confirm('Bạn muốn xoá bài viết này?')) {
      dispatch(deleteClassroom({ classroom, auth, socket }));
      return history.push('/');
    }
  };
  // Saved
  useEffect(() => {}, [auth.user.saved, classroom._id]);
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
                {auth.user._id === classroom.user._id && (
                  <>
                    <div className="dropdown-item" onClick={handleEditPost}>
                      Chỉnh sửa
                    </div>
                    <div className="dropdown-item" onClick={handleDeletePost}>
                      Xoá
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="joined__avatar">
          <Avatar src={auth.user.avatar} size="class-avatar" />
        </div>

        <div className="text_title">
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
    </li>
  );
};

export default ClassCard;
