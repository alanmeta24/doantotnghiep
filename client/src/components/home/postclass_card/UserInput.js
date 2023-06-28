import Avatar from '../../Avatar';

const UserImg = ({ user, border }) => {
  return (
    <div
      className={`d-flex p-8 align-items-center justify-content-between w-16 ${border}`}
    >
      <Avatar src={user.avatar} size="small-avatar" />
    </div>
  );
};

export default UserImg;
