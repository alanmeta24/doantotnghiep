import { GLOBALTYPES } from '../actions/globalTypes';

const statusPostclassReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS_POSTCLASS:
      return action.payload;
    default:
      return state;
  }
};

export default statusPostclassReducer;
