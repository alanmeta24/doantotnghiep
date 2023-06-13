import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

export const CLASSROOM_TYPES = {
  CREATE_CLASSROOM: 'CREATE_CLASSROOM',
  LOADING_CLASSROOM: 'LOADING_CLASSROOM',
  GET_CLASSROOMS: 'GET_CLASSROOMS',
  UPDATE_CLASSROOM: 'UPDATE_CLASSROOM',
  GET_CLASSROOM: 'GET_CLASSROOM',
  DELETE_CLASSROOM: 'DELETE_CLASSROOM',
};

export const createClassroom =
  ({ className, subject, semester, auth, socket }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI(
        'classrooms',
        { className, subject, semester },
        auth.token,
      );

      dispatch({
        type: CLASSROOM_TYPES.CREATE_CLASSROOM,
        payload: { ...res.data.newClassroom, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      const msg = {
        id: res.data.newClassroom._id,
        text: 'đã thêm bài đăng mới.',
        recipients: res.data.newClassroom.user.followers,
        url: `/post/${res.data.newClassroom._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getClassrooms = (token) => async (dispatch) => {
  try {
    dispatch({ type: CLASSROOM_TYPES.LOADING_CLASSROOM, payload: true });
    const res = await getDataAPI('classrooms', token);

    dispatch({
      type: CLASSROOM_TYPES.GET_CLASSROOMS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: CLASSROOM_TYPES.LOADING_CLASSROOM, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updateClassroom =
  ({ className, subject, semester, auth, status_class }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `classroom/${status_class._id}`,
        {
          className,
          subject,
          semester,
        },
        auth.token,
      );

      dispatch({
        type: CLASSROOM_TYPES.UPDATE_CLASSROOM,
        payload: res.data.newClassroom,
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getClassroom =
  ({ detailClassroom, id, auth }) =>
  async (dispatch) => {
    if (detailClassroom.every((classroom) => classroom._id !== id)) {
      try {
        const res = await getDataAPI(`classroom/${id}`, auth.token);
        dispatch({
          type: CLASSROOM_TYPES.GET_CLASSROOM,
          payload: res.data.classroom,
        });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deleteClassroom =
  ({ classroom, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: CLASSROOM_TYPES.DELETE_CLASSROOM, payload: classroom });

    try {
      const res = await deleteDataAPI(`classroom/${classroom._id}`, auth.token);

      // Notify
      const msg = {
        id: classroom._id,
        text: 'đã thêm lớp học mới.',
        recipients: res.data.newClassroom.user.followers,
        url: `/classroom/${classroom._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
