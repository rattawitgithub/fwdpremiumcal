import _ from 'lodash';
import { FETCH_HISS, CREATE_HIS } from '../actions/types';

const historyReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_HISS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case CREATE_HIS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
export default historyReducer;
