import { GLOBALTYPES } from '../actions/globalTypes';

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS_CLASS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
