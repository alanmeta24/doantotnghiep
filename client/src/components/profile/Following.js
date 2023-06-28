import { useSelector } from 'react-redux';
import FollowBtn from '../FollowBtn';
import UserCard from '../UserCard';

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Đang theo dõi</h5>
        <hr />

        <div className="follow_content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>

        <button
          className="btn btn_close"
          onClick={() => setShowFollowing(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Following;
