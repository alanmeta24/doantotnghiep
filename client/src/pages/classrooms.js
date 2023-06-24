import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '../components/Helmet';
import ListClass from '../components/Classroom/LissClass';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import React from 'react';
import JoinClass from '../components/Classroom/JoinClass';

const Classrooms = () => {
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Helmet title="Lớp học">
      <div className="home_page ">
        {/* <div className="home_page_middle">
          {homeClasses.loading ? (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
          ) : homeClasses.result === 0 && homeClasses.posts.length === 0 ? (
            <h4 className="text-center text-danger" style={{ padding: '10px' }}>
              Chưa có bài viết nào
            </h4>
          ) : (sta
            <Posts />
          )}
        </div> */}
        <div className="header_class">
          {auth.user.role !== 'user' && (
            <button
              className="btn"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.STATUS_CLASS, payload: true })
              }
            >
              Tạo lớp học
            </button>
          )}

          <button className="btn" onClick={() => setOpenJoinClass(true)}>
            Tham gia lớp học
          </button>

          {openJoinClass && (
            <JoinClass
              openJoinClass={openJoinClass}
              setOpenJoinClass={setOpenJoinClass}
            />
          )}
        </div>
        {/* <Route></Route> */}

        <ListClass />
      </div>
    </Helmet>
  );
};

export default Classrooms;
