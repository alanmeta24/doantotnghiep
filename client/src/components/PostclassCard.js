import React from 'react';
import CardHeader from './home/postclass_card/CardHeader';
import CardBody from './home/postclass_card/CardBody';
import CardFooter from './home/postclass_card/CardFooter';

import Comments from './home/postclass_card/Comments';
import InputComment from './home/postclass_card/InputComment';

const PostclassCard = ({ post, theme }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostclassCard;
