import { GLOBALTYPES, EditData, DeleteData } from './globalTypes';
import { CLASSROOM_TYPES } from './classroomAction';
import {
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

export const createTweet =
  ({ classroom, newTweet, auth, socket }) =>
  async (dispatch) => {
    const newClassroom = {
      ...classroom,
      tweets: [...classroom.tweets, newTweet],
    };

    dispatch({ type: CLASSROOM_TYPES.UPDATE_CLASSROOM, payload: newClassroom });

    try {
      const data = {
        ...newTweet,
        classroomId: classroom._id,
        classroomUserId: classroom.user._id,
      };
      const res = await postDataAPI('tweet', data, auth.token);

      const newData = { ...res.data.newTweet, user: auth.user };
      const newClassroom = {
        ...classroom,
        tweets: [...classroom.tweets, newData],
      };
      dispatch({
        type: CLASSROOM_TYPES.UPDATE_CLASSROOM,
        payload: newClassroom,
      });

      // // Socket
      // socket.emit('creatTweet', newClassroom);

      // // Notify
      // const msg = {
      //   id: res.data.newTweet._id,
      //   url: `/classroom/${classroom._id}`,
      // };

      // dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateTweet =
  ({ tweet, classroom, content, auth }) =>
  async (dispatch) => {
    const newTweets = EditData(classroom.tweets, tweet._id, {
      ...tweet,
      content,
    });
    const newClassroom = { ...classroom, tweets: newTweets };

    dispatch({ type: CLASSROOM_TYPES.UPDATE_CLASSROOM, payload: newClassroom });
    try {
      patchDataAPI(`tweet/${tweet._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

// export const deleteTweet =
//   ({ classroom, tweet, auth, socket }) =>
//   async (dispatch) => {
//     const deleteArr = [
//       ...classroom.tweets.filter((cm) => cm.reply === tweet._id),
//       tweet,
//     ];

//     const newClassroom = {
//       ...classroom,
//       tweets: classroom.tweets.filter(
//         (cm) => !deleteArr.find((da) => cm._id === da._id),
//       ),
//     };

//     dispatch({ type: CLASSROOM_TYPES.UPDATE_CLASSROOM, payload: newClassroom });

//     socket.emit('deleteTweet', newClassroom);
//     try {
//       deleteArr.forEach((item) => {
//         deleteDataAPI(`tweet/${item._id}`, auth.token);

//         const msg = {
//           id: item._id,
//           url: `/classroom/${classroom._id}`,
//         };

//         dispatch(removeNotify({ msg, auth, socket }));
//       });
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: { error: err.response.data.msg },
//       });
//     }
//   };
