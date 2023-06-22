import React, { useState, useEffect } from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { updateTweet } from '../../../redux/actions/tweetAction';

const TweetCard = ({ children, tweet, classroom }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    setContent(tweet.content);
  }, [tweet]);

  return (
    <div className="comment_card mt-2">
      <Link to={`/profile/${auth.user._id}`} className="d-flex text-dark">
        <Avatar src={auth.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{auth.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          <span>{content}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default TweetCard;
