import { useEffect, useState } from 'react';
import Info from '../../components/profile/Info';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUsers } from '../../redux/actions/profileAction';
import Helmet from '../../components/Helmet';
// import Header from '../../components/Header/Header';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

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
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
