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
import homeClassrooms from './classroomReducer';
import modal from './modalReducer';
import discover from './discoverReducer';
import suggestions from './suggestionsReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';
import detailPost from './detailPostReducer';
import detailExercise from './detailExerciseReducer';
import detailClassroom from './detailClassroomReducer';

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
  detailExercise,
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
