import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from './profileReducer';
import status from './statusReducer';
import status_class from './status_classReducer';
import status_postclass from './status_postclassReducer';
import homePosts from './postReducer';
import postClassrooms from './postclassReducer';
import modal from './modalReducer';
import detailPost from './detailPostReducer';
import discover from './discoverReducer';
import suggestions from './suggestionsReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';
import detailClassroom from './detailClassroomReducer';
import homeClassrooms from './classroomReducer';

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  status_class,
  status_postclass,
  homePosts,
  postClassrooms,
  homeClassrooms,
  detailPost,
  detailClassroom,
  modal,
  discover,
  suggestions,
  socket,
  notify,
  message,
  online,
  call,
  peer,
});
