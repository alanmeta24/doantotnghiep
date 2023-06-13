import ClassCard from '../../components/Classroom/ClassCard';
import React from 'react';
import { useSelector } from 'react-redux';

const ListClass = () => {
  const { homeClassrooms } = useSelector((state) => state);

  return (
    <div className="list_class">
      {homeClassrooms.classrooms.map((classroom) => (
        <ClassCard key={classroom._id} classroom={classroom} />
      ))}
    </div>
  );
};
export default ListClass;
