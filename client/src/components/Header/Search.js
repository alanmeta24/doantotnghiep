import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadIcon from '../../assets/images/loading.gif';
import { GLOBALTYPES } from '../../redux/types/globalTypes';
import { getDataAPI } from '../../api/fetchData';
import UserCard from '../UserCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        title="Tìm kiếm"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
        }
      />

      <div className="search_icon" style={{ opacity: search ? 0 : 0.5 }}>
        <span className="material-icons" style={{ fontSize: '22px' }}>
          search
        </span>
        <span>Tìm kiếm</span>
      </div>

      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: 'none' }}>
        Tìm Kiếm
      </button>

      {load && <img className="loading_search" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
