import React, { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body" style={{ borderBottom: '1.7px solid #f5f5f5' }}>
      <div
        className="card_body-content"
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
        }}
      >
        <p className="hide_content title"> {post.title}</p>
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + '.....'}
        </span>
        {post.content.length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Ẩn' : 'Xem thêm'}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
