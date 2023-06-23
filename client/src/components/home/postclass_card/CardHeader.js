import moment from 'moment';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postclassAction';
import { BASE_URL } from '../../../utils/config';
import Avatar from '../../Avatar';

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS_POST,
      payload: { ...post, onEdit: true },
    });
  };
  const handleDeletePost = () => {
    if (window.confirm('Bạn muốn xoá bài viết này?')) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push('/');
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  // Saved
  useEffect(() => {}, [auth.user.saved, post._id]);

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="medium-avatar" />
        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.fullname}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).format('HH:mm')}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>
        <div
          className="dropdown-menu"
          style={{ borderRadius: '12px', border: 'none' }}
        >
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                Chỉnh sửa
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                Xoá
              </div>
            </>
          )}
          <div className="dropdown-item" onClick={handleCopyLink}>
            Sao chép đường liên kết
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardHeader;
