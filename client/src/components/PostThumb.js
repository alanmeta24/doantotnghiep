import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0)
    return <h2 className="text-center text-danger">Không có bài viết</h2>;

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            <div className="post_thumb_show">
              <span className="hide_content title"> {post.title}</span>

              <span className="hide_content content"> {post.content}</span>

              <small className="text-muted moment">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
