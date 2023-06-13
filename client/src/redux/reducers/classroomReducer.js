import { CLASSROOM_TYPES } from '../actions/classroomAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
  loading: false,
  classrooms: [],
  result: 0,
  page: 2,
};

const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSROOM_TYPES.CREATE_CLASSROOM:
      return {
        ...state,
        classrooms: [action.payload, ...state.classrooms],
      };
    case CLASSROOM_TYPES.LOADING_CLASSROOM:
      return {
        ...state,
        loading: action.payload,
      };
    case CLASSROOM_TYPES.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload.classrooms,
        result: action.payload.result,
        page: action.payload.page,
      };
    case CLASSROOM_TYPES.UPDATE_CLASSROOM:
      return {
        ...state,
        classrooms: EditData(
          state.classrooms,
          action.payload._id,
          action.payload,
        ),
      };
    case CLASSROOM_TYPES.DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: DeleteData(state.classrooms, action.payload._id),
      };
    default:
      return state;
  }
};

export default classroomReducer;
