import { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Discover from './pages/discover';
import Login from './pages/login';
import Register from './pages/register';
import Forgot from './pages/forgotPassword';
import Reset from './pages/resetPassword';
import Body from './Body';

import Alert from './components/alert/Alert';
import Header from './components/Header/Header';
import StatusModal from './components/StatusModal';
import NotFound from './components/NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getClassrooms } from './redux/actions/classroomAction';
import { getPostclassrooms } from './redux/actions/postclassAction';
import { getSuggestions } from './redux/actions/suggestionsAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

import { getNotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';
import ClassModal from './components/Classroom/ClassModal';
import OpenHeaderDetail from './components/Exercise/OpenHeaderDetail';
import PostclassModal from './components/PostclassModal';
import HeaderDetail from './components/Classroom/HeaderDetail';

function App() {
  const { auth, status, status_class, status_postclass, modal, call } =
    useSelector((state) => state);
  const { isLogged } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getClassrooms(auth.token));
      dispatch(getPostclassrooms(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  // const RenderHeader = (isHeader) => {
  //   if (isHeader) {
  //     return <HeaderDetail />;
  //   }
  // };

  return (
    <Router>
      <Alert />
      <div className="App">
        <div className="main">
          {/* {auth.token && !window.location.pathname.includes('classroom') ? (
            <Header />
          ) : (
            <OpenHeaderDetail />
          )} */}

          {auth.token && <Header />}
          {status && <StatusModal />}
          {status_class && <ClassModal />}
          {status_postclass && <PostclassModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Body />

          <Route exact path="/" component={auth.token ? Discover : Login} />
          <Route
            exact
            path="/register"
            component={isLogged ? NotFound : Register}
          />
          <Route
            exact
            path="/forgot_password"
            component={isLogged ? NotFound : Forgot}
          />
          <Route
            exact
            path="/reset/:token"
            component={isLogged ? NotFound : Reset}
          />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
