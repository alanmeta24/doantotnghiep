import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

export const POSTCLASS_TYPES = {
  CREATE_POSTCLASS: 'CREATE_POSTCLASS',
  LOADING_POSTCLASS: 'LOADING_POSTCLASS',
  GET_POSTCLASSROOMS: 'GET_POSTCLASSROOMS',
  UPDATE_POSTCLASS: 'UPDATE_POSTCLASS',
  GET_POSTCLASS: 'GET_POSTCLASS',
  DELETE_POSTCLASS: 'DELETE_POSTCLASS',
};
export const createPost =
  ({ content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        'postclassrooms',
        { content, images: media },
        auth.token,
      );

      dispatch({
        type: POSTCLASS_TYPES.CREATE_POSTCLASS,
        payload: { ...res.data.newPostclass, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      const msg = {
        id: res.data.newPostclass._id,
        text: 'đã thêm bài đăng mới.',
        recipients: res.data.newPostclass.user.followers,
        url: `/postclassroom/${res.data.newPostclass._id}`,
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

export const getPostclassrooms = (token) => async (dispatch) => {
  try {
    dispatch({ type: POSTCLASS_TYPES.LOADING_POSTCLASS, payload: true });
    const res = await getDataAPI('postclassrooms', token);

    dispatch({
      type: POSTCLASS_TYPES.GET_POSTCLASSROOMS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: POSTCLASS_TYPES.LOADING_POSTCLASS, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
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
        `postclassroom/${status._id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token,
      );

      dispatch({
        type: POSTCLASS_TYPES.UPDATE_POSTCLASS,
        payload: res.data.newPostclass,
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
    const newPostclass = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POSTCLASS_TYPES.UPDATE_POSTCLASS, payload: newPostclass });

    socket.emit('likePost', newPostclass);

    try {
      await patchDataAPI(`postclassroom/${post._id}/like`, null, auth.token);

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'thích bài đăng của bạn.',
        recipients: [post.user._id],
        url: `/postclassroom/${post._id}`,
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
    const newPostclass = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    dispatch({ type: POSTCLASS_TYPES.UPDATE_POSTCLASS, payload: newPostclass });

    socket.emit('unLikePost', newPostclass);

    try {
      await patchDataAPI(`postclassroom/${post._id}/unlike`, null, auth.token);

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'thích bài đăng của bạn.',
        recipients: [post.user._id],
        url: `/postclassroom/${post._id}`,
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
        const res = await getDataAPI(`postclassroom/${id}`, auth.token);
        dispatch({
          type: POSTCLASS_TYPES.GET_POSTCLASS,
          payload: res.data.post,
        });
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
    dispatch({ type: POSTCLASS_TYPES.DELETE_POSTCLASS, payload: post });

    try {
      const res = await deleteDataAPI(`postclassroom/${post._id}`, auth.token);

      // Notify
      const msg = {
        id: post._id,
        text: 'đã thêm bài đăng mới.',
        recipients: res.data.newPostclass.user.followers,
        url: `/postclassroom/${post._id}`,
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
      await patchDataAPI(`savePostClassroom/${post._id}`, null, auth.token);
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
      await patchDataAPI(`unSavePostClassroom/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
