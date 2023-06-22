import React, { useState, useEffect } from 'react';
import TweetCard from './TweetCard';

const TweetDisplay = ({ tweet, classroom }) => {
  return (
    <div className="comment_display">
      <TweetCard tweet={tweet} classroom={classroom}></TweetCard>
    </div>
  );
};

export default TweetDisplay;
