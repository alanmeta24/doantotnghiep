import { useState } from 'react';
import Helmet from '../components/Helmet';

import CreateIntive from '../components/Member/CreateIntive';

const Members = () => {
  const [openIntive, setOpenIntive] = useState(false);
  return (
    <Helmet title="Thành viên lớp học">
      <div className="content container-class">
        <div className="user-list">
          <div className="user-heading">
            <h2>Giáo viên</h2>
            <div className="user-amount">
              <p>số giáo viên</p>
              <div className="user-add" onClick={() => setOpenIntive(true)}>
                <span class="material-icons-outlined">person_add_alt</span>
              </div>
              {openIntive && (
                <CreateIntive
                  openIntive={openIntive}
                  setOpenIntive={setOpenIntive}
                />
              )}
            </div>
          </div>
          <div className="user-todo">danh sách giáo viên</div>
        </div>
        <div className="user-list">
          <div className="user-heading">
            <h2>Sinh viên</h2>
            <div className="user-amount">
              <p>số sinh viên</p>
              <div className="user-add">
                <span class="material-icons-outlined">person_add_alt</span>
              </div>
            </div>
          </div>
          <div className="user-todo">danh sách sinh viên</div>
        </div>
      </div>
    </Helmet>
  );
};

export default Members;
