import React, { useState, useEffect } from 'react';
import CommentDisplay from './comments/CommentDisplay';
import TweetDisplay from './tweets/TweetDisplay';

const Tweets = ({ classroom }) => {
  return (
    <div className="comments">
      {classroom.tweets.map((tweet) => (
        <TweetDisplay key={tweet._id} tweet={tweet} classroom={classroom} />
      ))}
    </div>
  );
};

export default Tweets;
