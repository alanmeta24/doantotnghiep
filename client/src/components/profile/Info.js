import { useEffect, useState } from 'react';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';

import ImgBuilding from '../../assets/images/building.jpg';
import FollowBtn from '../FollowBtn';

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);
  // click status modal
  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <div className="profile_avatar">
            <img src={ImgBuilding} alt="" className="profile_cover" />
            <div className="profile_avatar_wrap">
              <div className="profile_avatar_avar">
                <div className="profile_avatar_img">
                  <Avatar src={user.avatar} size="supper-avatar" />
                </div>
              </div>
              <div className="profile_avatar_info">
                <h4>{user.fullname}</h4>
                <h4>@{user.username}</h4>
              </div>
              <div className="container_content-title">
                {user._id === auth.user._id ? (
                  <button
                    className="btn btn-follow btn-warning"
                    onClick={() => setOnEdit(true)}
                  >
                    Chỉnh sửa trang cá nhân
                  </button>
                ) : (
                  <FollowBtn user={user} />
                )}
              </div>
            </div>
          </div>

          <div className="info_status">Comingsoon...</div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
