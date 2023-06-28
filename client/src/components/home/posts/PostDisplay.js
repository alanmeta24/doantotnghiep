import React, { useState, useEffect } from 'react';
import PostCard from '../../PostCard';

const PostDisplay = ({ post, classroom }) => {
  return (
    <div className="comment_display">
      <PostCard post={post} classroom={classroom}></PostCard>
    </div>
  );
};

export default PostDisplay;
