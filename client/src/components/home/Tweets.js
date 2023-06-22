import React, { useState, useEffect } from 'react';
import CommentDisplay from './comments/CommentDisplay';
import TweetDisplay from './tweets/TweetDisplay';

const Tweets = ({ classroom }) => {
  return (
    <div className="comments">
      {classroom.tweets.map((tweet) => (
        <TweetDisplay key={tweet._id} tweet={tweet} classroom={classroom} />
      ))}

      {/* {comments.length - next > 0 ? (
        <div
          className="p-2 border-top"
          style={{ cursor: 'pointer', color: 'crimson' }}
          onClick={() => setNext(next + 10)}
        >
          Xem thêm bình luận...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="p-2 border-top"
            style={{ cursor: 'pointer', color: 'crimson' }}
            onClick={() => setNext(2)}
          >
            Ẩn bình luận...
          </div>
        )
      )} */}
    </div>
  );
};

export default Tweets;
