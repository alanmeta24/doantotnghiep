import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from '../../redux/actions/postAction';
import PostDisplay from './posts/PostDisplay';

const Posts = ({ classroom }) => {
  // const { homePosts, auth, theme } = useSelector((state) => state);
  // const dispatch = useDispatch()

  // const [load, setLoad] = useState(false)

  // const handleLoadMore = async () => {
  //     setLoad(true)
  //     const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

  //     dispatch({
  //         type: POST_TYPES.GET_POSTS,
  //         payload: {...res.data, page: homePosts.page + 1}
  //     })

  //     setLoad(false)
  // }

  return (
    <div className="posts">
      {classroom.posts.map((post) => (
        <PostDisplay key={post._id} post={post} classroom={classroom} />
      ))}

      {/* {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      /> */}
    </div>
  );
};

export default Posts;
