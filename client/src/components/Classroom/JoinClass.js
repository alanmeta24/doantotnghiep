import React, { useState } from 'react';
import { Button, Dialog, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const JoinClass = ({ openJoinClass, setOpenJoinClass }) => {
  const [classCode, setClassCode] = useState('');

  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (classCode === ){}
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={openJoinClass}
        onClose={() => setOpenJoinClass(false)}
      >
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setOpenJoinClass(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Tham gia lớp học</div>
            </div>
          </div>

          <div className="joinClass__form">
            <div
              style={{ fontSize: '1.25rem', color: '#3c4043' }}
              className="joinClass__formText"
            >
              Mã lớp học
            </div>
            <div
              style={{ color: '#3c4043', marginTop: '-5px' }}
              className="joinClass__formText"
            >
              Hãy liên hệ giáo viên của bạn để biết mã lớp học, sau đó nhập mã
              đó vào đây.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Nhập mã lớp"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && 'Không tìm thấy lớp học nào'}
              />

              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Tham gia
              </Button>
              {/* <TextField
                id="outlined-basic"
                label="Owner's email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              /> */}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default JoinClass;
