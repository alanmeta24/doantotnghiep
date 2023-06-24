import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import {
  createClassroom,
  updateClassroom,
} from '../../redux/actions/classroomAction';
import { Button, Dialog, DialogActions, TextField } from '@material-ui/core';
// import './style.css';
const ClassModal = () => {
  const { auth, status_class, socket } = useSelector((state) => state);
  const [className, setClassName] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status_class.onEdit) {
      dispatch(
        updateClassroom({
          className,
          semester,
          subject,
          auth,
          status_class,
        }),
      );
    } else {
      dispatch(createClassroom({ className, semester, subject, auth, socket }));
    }

    setClassName('');
    setSemester('');
    setSubject('');

    dispatch({ type: GLOBALTYPES.STATUS_CLASS, payload: false });
  };

  useEffect(() => {
    if (status_class.onEdit) {
      setClassName(status_class.className);
      setSemester(status_class.semester);
      setSubject(status_class.subject);
    }
  }, [status_class]);
  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">Tạo lớp học</h5>
          <span
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS_CLASS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>

        {/* <div className="status_body">
          <input
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setClassName(e.target.value)}
            value={className}
            name="className"
            style={{ borderRadius: '8px' }}
            placeholder="Tên lớp học (bắt buộc)"
          />
          <input
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            name="subject"
            style={{ borderRadius: '8px' }}
            placeholder="Môn học"
          />
          <input
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
            name="semester"
            style={{ borderRadius: '8px' }}
            placeholder="Học kì"
          />
        </div> */}

        <div className="form__inputs">
          <TextField
            id="filled-basic"
            label="Tên lớp học (bắt buộc)"
            className="form__input"
            variant="filled"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Môn học"
            className="form__input"
            variant="filled"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Học kì"
            className="form__input"
            variant="filled"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>

        <div className="status_footer">
          <button
            className="btn btn-secondary w-100"
            type="submit"
            style={{ padding: '10px' }}
          >
            Tạo lớp học
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassModal;
