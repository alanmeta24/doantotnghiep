import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/vi';
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
              <div className="header_forum">
                <i className="far fa-heart text">
                  {' '}
                  <span className="number">{post.likes.length}</span>
                </i>
                <i className="far fa-comment text">
                  {' '}
                  <span className="number">{post.comments.length}</span>
                </i>
                <small className="text-muted moment">
                  {moment(post.createdAt).fromNow()}
                </small>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
