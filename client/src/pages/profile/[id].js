import { useEffect, useState } from 'react';

import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import Saved from '../../components/profile/Saved';
import LoadIcon from '../../assets/images/loading.gif';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Helmet from '../../components/Helmet';
import { getProfileUsers } from '../../redux/actions/profileAction';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <Helmet title="Trang cá nhân">
      <div className="main">
        <div className="profile">
          <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

          {auth.user._id === id && (
            <div className="profile_tab">
              <button
                className="btn btn-warning"
                onClick={() => setSaveTab(true)}
                style={{ color: 'black' }}
              >
                Bài viết đã lưu
              </button>
            </div>
          )}

          {profile.loading ? (
            <img
              src={LoadIcon}
              alt="loading"
              className="d-block mx-auto my-4"
            />
          ) : (
            <>{saveTab && <Saved auth={auth} dispatch={dispatch} />}</>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
