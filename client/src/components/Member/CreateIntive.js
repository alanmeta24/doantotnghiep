import { Button, Dialog } from '@material-ui/core';
import Search from '../header1/Search';

import React from 'react';

const CreateIntive = ({ openIntive, setOpenIntive }) => {
  return (
    <Dialog
      onClose={() => setOpenIntive(false)}
      aria-labelledby="customized-dialog-title"
      open={openIntive}
      maxWidth="lg"
      className="form__dialog"
    >
      <div className="form">
        <p className="class__title">Mời giáo viên</p>

        <Search />
        <div className="form__dialog">
          <Button
            onClick={() => setOpenIntive(false)}
            color="primary"
            style={{ marginRight: '5px' }}
          >
            Hủy
          </Button>

          <Button
            // onClick={handleSubmit}
            color="primary"
            variant="contained"
            style={{ marginLeft: '5px' }}
          >
            Mời
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateIntive;
