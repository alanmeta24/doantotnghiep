import { useEffect, useState } from 'react';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataAPI } from '../../utils/fetchData';
import LoadIcon from '../../assets/images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import PostThumb from '../PostThumb';

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI('getSavePosts', auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div style={{ width: '943px', marginLeft: '19%' }}>
      <span style={{ marginLeft: '43%', fontSize: '18px', fontWeight: '500' }}>
        {' '}
        Bài viết đã lưu
      </span>
      <PostThumb posts={savePosts} result={result} />

      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      )}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
