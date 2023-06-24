import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

export const EXERCISE_TYPES = {
  CREATE_EXERCISE: 'CREATE_EXERCISE',
  LOADING_EXERCISE: 'LOADING_EXERCISE',
  GET_EXERCISES: 'GET_EXERCISES',
  UPDATE_EXERCISE: 'UPDATE_EXERCISE',
  GET_EXERCISE: 'GET_EXERCISE',
  DELETE_EXERCISE: 'DELETE_EXERCISE',
};
export const createPost =
  ({ title, content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'posts',
        { title, content, images: media },
        auth.token,
      );

      dispatch({
        type: EXERCISE_TYPES.CREATE_EXERCISE,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      const msg = {
        id: res.data.newPost._id,
        text: 'đã thêm bài đăng mới.',
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        title,
        content,
        image: media[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: EXERCISE_TYPES.LOADING_EXERCISE, payload: true });
    const res = await getDataAPI('posts', token);

    dispatch({
      type: EXERCISE_TYPES.GET_EXERCISES,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: EXERCISE_TYPES.LOADING_EXERCISE, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ title, content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        {
          title,
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token,
      );

      dispatch({
        type: EXERCISE_TYPES.UPDATE_EXERCISE,
        payload: res.data.newPost,
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: EXERCISE_TYPES.UPDATE_EXERCISE, payload: newPost });

    socket.emit('likePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'thích bài đăng của bạn.',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        title: post.title,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: EXERCISE_TYPES.UPDATE_EXERCISE, payload: newPost });

    socket.emit('unLikePost', newPost);

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'thích bài đăng của bạn.',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: EXERCISE_TYPES.GET_EXERCISE, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: EXERCISE_TYPES.DELETE_EXERCISE, payload: post });

    try {
      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      // Notify
      const msg = {
        id: post._id,
        text: 'đã thêm bài đăng mới.',
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`savePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
