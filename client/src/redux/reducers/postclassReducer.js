import { POSTCLASS_TYPES } from '../actions/postclassAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
  loading: false,
  postclassrooms: [],
  result: 0,
  page: 2,
};

const postclassReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTCLASS_TYPES.CREATE_POSTCLASS:
      return {
        ...state,
        postclassrooms: [action.payload, ...state.postclassrooms],
      };
    case POSTCLASS_TYPES.LOADING_POSTCLASS:
      return {
        ...state,
        loading: action.payload,
      };
    case POSTCLASS_TYPES.GET_POSTCLASSROOMS:
      return {
        ...state,
        postclassrooms: action.payload.postclassrooms,
        result: action.payload.result,
        page: action.payload.page,
      };
    case POSTCLASS_TYPES.UPDATE_POSTCLASS:
      return {
        ...state,
        postclassrooms: EditData(
          state.postclassrooms,
          action.payload._id,
          action.payload,
        ),
      };
    case POSTCLASS_TYPES.DELETE_POSTCLASS:
      return {
        ...state,
        postclassrooms: DeleteData(state.postclassrooms, action.payload._id),
      };
    default:
      return state;
  }
};

export default postclassReducer;
