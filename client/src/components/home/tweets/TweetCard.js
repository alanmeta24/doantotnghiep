import React, { useState, useEffect } from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { updateTweet } from '../../../redux/actions/tweetAction';

const TweetCard = ({ children, tweet, classroom, tweetId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    setContent(tweet.content);
  }, [tweet, auth.user._id]);

  const handleUpdate = () => {
    if (tweet.content !== content) {
      dispatch(updateTweet({ tweet, classroom, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  return (
    <div className="comment_card mt-2">
      <Link to={`/profile/${auth.user._id}`} className="d-flex text-dark">
        <Avatar src={auth.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{auth.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {/* {onEdit ? ( */}
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* ) : (
            <div>
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + ' '
                  : content.slice(0, 100) + '....'}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? 'Hide content' : 'Read more'}
                </span>
              )}
            </div>
          )} */}

          <div style={{ cursor: 'pointer' }}>
            {/* <small className="text-muted mr-3">
              {moment(tweet.createdAt).fromNow()}
            </small> */}

            {onEdit && (
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
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default TweetCard;
