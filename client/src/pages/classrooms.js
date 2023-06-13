import { useState } from 'react';
import Helmet from '../components/Helmet';
import ListClass from '../components/Classroom/LissClass';
import Header from '../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import ClassModal from '../components/Classroom/ClassModal';
import JoinClass from '../components/JoinClass';
const Classrooms = () => {
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [openCreateClass, setOpenCreateClass] = useState(false);

  return (
    <Helmet title="Danh sách lớp">
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
          <button className="btn" onClick={() => setOpenCreateClass(true)}>
            Tạo lớp học
          </button>
          {openCreateClass && (
            <ClassModal
              openCreateClass={openCreateClass}
              setOpenCreateClass={setOpenCreateClass}
            />
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

        <ListClass />
      </div>
    </Helmet>
  );
};

export default Classrooms;
