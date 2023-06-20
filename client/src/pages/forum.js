import { useState, useEffect } from 'react';
import Helmet from '../components/Helmet';
import ListClass from '../components/Classroom/LissClass';
import Header from '../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import ClassModal from '../components/Classroom/ClassModal';
import JoinClass from '../components/JoinClass';

import LoadIcon from '../images/loading.gif';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';

import { GLOBALTYPES } from '../redux/actions/globalTypes';
let scroll = 0;

const Home = () => {
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const { homeClassrooms } = useSelector((state) => state);
  const { homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">Không Có Bài Đăng</h2>
        ) : (
          <Posts />
        )}
      </div>
    </div>
  );
};

export default Home;
