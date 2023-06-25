import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Dialog, Slide, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const CreateExercise = ({ createExercise, setCreateExercise }) => {
  const { auth, status, socket } = useSelector((state) => state);

  const [title, setTitle] = useState('');
  const [guide, setGuide] = useState('');
  const [file, setFile] = useState([]);
  const [expires, setExpires] = useState('Không có ngày đến hạn');
  const [point, setPoint] = useState(100);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (status.onEdit) {
    //   dispatch(updateClassroom({ title, guide, file, expires, point,auth, status }));
    // } else {
    //   dispatch(createClassroom({ title, guide, file, expires, point,auth, socket }));
    // }

    setTitle('');
    setGuide('');
    setFile('');
    setExpires('');
    setPoint('');
    // setOpenCreateClass(false);
  };

  useEffect(() => {
    if (status.onEdit) {
      setTitle(status.title);
      setGuide(status.guide);
      setFile(status.file);
      setExpires(status.expires);
      setPoint(status.point);
    }
  }, [status]);

  return (
    <div className="home_page">
      <Dialog
        fullScreen
        open={createExercise}
        onClose={() => setCreateExercise(false)}
      >
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setCreateExercise(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Bài tập</div>
            </div>
          </div>
          <div className="exercise-container">
            <div className="exercise-form">
              <div className="exercise-post">
                <TextField
                  id="filled-basic"
                  label="Tiêu đề"
                  className="form__input"
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="filled-multiline-exercise"
                  multiline
                  label="Hướng dẫn (Không bắt buộc)"
                  variant="filled"
                  value={guide}
                  onChange={(e) => setGuide(e.target.value)}
                />
              </div>
              <div className="exercise-post">
                <TextField
                  id="filled-basic"
                  label="Tiêu đề"
                  className="form__input"
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="exercise_"></div>

              <div className="exercise-point">
                <div
                  style={{ fontSize: '1.25rem', color: '#3c4043' }}
                  className="exercise-text"
                >
                  Hạn nộp bài tập
                </div>
                <label className="mt-3" htmlFor="">
                  Hạn mã giảm:{' '}
                </label>
                <DatePicker
                  className="d-block"
                  // onChange={onChange}
                  // disabledDate={disabledDate}
                  // value={dateTime}
                  showTime={{ format: 'HH:mm' }}
                  format="MM/DD/YYYY HH:mm"
                />

                <div className="joinClass__loginInfo">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                  />
                  {/* <TextField
                    id="outlined-basic"
                    label="Owner's email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  /> */}
                </div>
              </div>
              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ width: '200px !important' }}
              >
                Giao bài
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default CreateExercise;
