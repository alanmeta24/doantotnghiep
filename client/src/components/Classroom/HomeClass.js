import Helmet from '../../components/Helmet';
import ClassDetail from '../../components/Classroom/ClassDetail';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassroom } from '../../redux/actions/classroomAction';

const HomeClass = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState([]);

  const { auth, detailClassroom } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassroom({ detailClassroom, id, auth }));

    if (detailClassroom.length > 0) {
      const newArr = detailClassroom.filter(
        (classroom) => classroom._id === id,
      );

      setClassroom(newArr);
    }
  }, [detailClassroom, dispatch, id, auth]);
  return (
    <Helmet title="Trang chủ">
      {classroom.map((classroom) => (
        <ClassDetail key={classroom._id} classroom={classroom} />
      ))}
      {/* <div className="home_page ">HomeClass</div> */}
    </Helmet>
  );
};

export default HomeClass;
