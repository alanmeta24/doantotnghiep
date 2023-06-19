import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTweet } from '../../redux/actions/tweetAction';
import Icons from '../Icons';

const TweetInput = ({ children, classroom }) => {
  const [content, setContent] = useState('');

  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    setContent('');

    const newTweet = {
      content,
      user: auth.user,
    };

    dispatch(createTweet({ classroom, newTweet, auth, socket }));
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Tạo thông báo tới sinh viên của bạn"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Icons setContent={setContent} content={content} theme={theme} />

      <button type="submit" className="postBtn">
        Đăng
      </button>
    </form>
  );
};

export default TweetInput;
