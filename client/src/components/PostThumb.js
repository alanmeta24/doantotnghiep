import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0)
    return <h2 className="text-center text-danger">Không Có Bài Đăng</h2>;

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            {post.content}

            <div className="post_thumb_menu">
              <i className="far fa-star">{post.likes.length}</i>
              <i className="far fa-comments">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
