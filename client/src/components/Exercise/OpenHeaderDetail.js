import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassroom } from '../../redux/actions/classroomAction';
import HeaderDetail from '../Classroom/HeaderDetail';

const OpenHeaderDetail = () => {
  const [createExercise, setCreateExercise] = useState(false);
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
    <div className="content container-class">
      {classroom.map((classroom) => (
        <>
          <HeaderDetail key={classroom._id} classroom={classroom} />
        </>
      ))}
    </div>
  );
};

export default OpenHeaderDetail;
