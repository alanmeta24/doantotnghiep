import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';
import { checkImage } from '../../utils/imageUpload';

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: '',
    mobile: '',
    story: '',
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, story } = userData;

  const [avatar, setAvatar] = useState('');

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setOnEdit(false);
  };

  return (
    <div className="edit_profile">
      <button className="btn btn_close" onClick={() => setOnEdit(false)}>
        &times;
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />
          <span>
            <i className="fas fa-camera" />
            <p>Thay Đổi</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="story">Câu châm ngôn</label>
          <input
            type="text"
            name="story"
            value={story}
            className="form-control"
            onChange={handleInput}
            style={{
              borderRadius: '10px',
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Tên đầy đủ</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
              style={{
                borderRadius: '10px',
              }}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: '460%',
                right: '5px',
                transform: 'translateY(-50%)',
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Số điện thoại</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
            style={{
              borderRadius: '10px',
            }}
          />
        </div>

        <button
          className="btn btn-success w-100"
          type="submit"
          style={{
            borderRadius: '10px',
          }}
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
