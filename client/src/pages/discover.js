import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from '../components/Helmet';
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from '../redux/actions/discoverAction';
import LoadIcon from '../images/loading.gif';
import PostThumb from '../components/PostThumb';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { getDataAPI } from '../utils/fetchData';
import Status from '../components/home/Status';
import UserCard from '../components/UserCard';
import Posts from '../components/home/Posts';
let scroll = 0;
const Discover = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' });
    }, 100);
  }, []);

  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth.token,
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <Helmet title="Diễn đàn">
      <div className="home row mx-0">
        <div className="col-md-7">
          <Status />
          {homePosts.loading ? (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
            <h2 className="text-center">Không có bài viết</h2>
          ) : (
            <Posts />
          )}
        </div>
        <div className="col-md-5">
          <div style={{ marginTop: '30px' }}>
            <UserCard user={auth.user} />
          </div>

          <h5 className="text-left" style={{ marginTop: '10px' }}>
            Các bài viết gần đây
          </h5>
          {discover.loading ? (
            <img
              src={LoadIcon}
              alt="loading"
              className="d-block mx-auto my-4"
            />
          ) : (
            <PostThumb posts={discover.posts} result={discover.result} />
          )}
          {load && (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          )}
          {!discover.loading && (
            <LoadMoreBtn
              result={discover.result}
              page={discover.page}
              load={load}
              handleLoadMore={handleLoadMore}
            />
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Discover;
