import { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body" style={{ borderBottom: '2px solid #f5f5f5' }}>
      <div className="card_body-content">
        <span>
          {post.content.length < 70
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 70) + '... '}
        </span>
        {post.content.length > 70 && (
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
