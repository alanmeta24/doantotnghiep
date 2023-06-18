import { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
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
import { getSuggestions } from './redux/actions/suggestionsAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

import { getNotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';
import ClassModal from './components/Classroom/ClassModal';

function App() {
  const { auth, status, status_class, modal, call } = useSelector(
    (state) => state,
  );
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

  return (
    <Router>
      <Alert />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {/* {status && <StatusModal />} */}
          {status_class && <ClassModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Body />

          <Route exact path="/" component={auth.token ? Home : Login} />
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
