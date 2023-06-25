import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../redux/actions/commentAction';
import UserImg from './UserInput';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };
  return (
    <form
      className="card-footer comment_input"
      onSubmit={handleSubmit}
      style={{ border: 'none', background: '#ffffff', width: '100%' }}
    >
      {children}
      {!setOnReply && <UserImg user={auth.user} />}

      <input
        type="text"
        placeholder="Thêm nhận xét trong lớp học..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          border: '1px solid rgb(201 199 199)',
          borderRadius: '50px',
          padding: '6px 10px',
          backgroundColor: 'white',
          margin: '0 10px',
        }}
      />

      {/* <Icons setContent={setContent} content={content} /> */}
      <button type="submit" className="btn">
        Đăng
      </button>
    </form>
  );
};

export default InputComment;

// import React from 'react';

// const InputComment = () => {
//   return <div>InputComment</div>;
// };

// export default InputComment;
