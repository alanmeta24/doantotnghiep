import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import CreateExercise from '../components/Exercise/CreateExercise';
import Helmet from '../components/Helmet';

const Exercise = () => {
  const [createExercise, setCreateExercise] = useState(false);
  return (
    <Helmet title="Bài tập">
      <div className="content container-class">
        <button
          className="btn"
          style={{
            padding: '14px 22px',
            borderRadius: '30px',
            margin: '15px 420px',
          }}
          onClick={() => setCreateExercise(true)}
        >
          <Add />
          Tạo
        </button>
        {createExercise && (
          <CreateExercise
            createExercise={createExercise}
            setCreateExercise={setCreateExercise}
          />
        )}
        {/* <ItemExercise /> */}
      </div>
    </Helmet>
  );
};

export default Exercise;
