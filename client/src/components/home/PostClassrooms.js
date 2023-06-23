import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POSTCLASS_TYPES } from '../../redux/actions/postclassAction';
import PostclassCard from '../PostclassCard';

const PostClassrooms = () => {
  const { postclassrooms, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `postclassrooms?limit=${postclassrooms.page * 9}`,
      auth.token,
    );

    dispatch({
      type: POSTCLASS_TYPES.GET_POSTCLASSROOMS,
      payload: { ...res.data, page: postclassrooms.page + 1 },
    });

    setLoad(false);
  };

  return (
    <div className="posts">
      {postclassrooms.postclassrooms.map((post) => (
        <PostclassCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={postclassrooms.result}
        page={postclassrooms.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default PostClassrooms;
