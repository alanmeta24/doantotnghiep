import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar';

import { useDispatch, useSelector } from 'react-redux';
import {
  likeComment,
  unLikeComment,
  updateComment,
} from '../../../redux/actions/commentAction';
import InputComment from './InputComment';
import CommentMenu from './CommentMenu';

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div className="comment_card mt-2">
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <span
          style={{
            fontSize: '1rem',
            color: '#0F1419',
            fontWeight: '600',
            marginLeft: '6px',
          }}
        >
          {' '}
          {comment.user.fullname}
        </span>

        <small
          style={{
            opacity: 0.8,
            fontSize: '1rem',
            color: '#536471',
            marginLeft: '5px',
          }}
        >
          <small className="text-muted mr-3">
            {moment(comment.createdAt).format('HH:mm')}
          </small>
        </small>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                  {comment.tag.fullname}
                </Link>
              )}
              <span>{content}</span>
            </div>
          )}

          <div style={{ cursor: 'pointer' }}>
            {onEdit ? (
              <>
                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                  Cập nhật
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  Huỷ
                </small>
              </>
            ) : (
              <small className="font-weight-bold mr-3" onClick={handleReply}>
                {onReply ? 'Huỷ' : 'Phản hồi'}
              </small>
            )}

            {/* <small className="text-muted mr-3">{moment(comment.createdAt).fromNow()}</small> */}
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: 'pointer' }}
        >
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            {onReply.user.fullname}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
