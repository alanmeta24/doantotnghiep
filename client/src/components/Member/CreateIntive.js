import { Button, Dialog } from '@material-ui/core';
import Search from '../Header/Search';

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
      </div>
    </Dialog>
  );
};

export default CreateIntive;
