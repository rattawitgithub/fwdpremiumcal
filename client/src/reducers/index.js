import { combineReducers } from 'redux';

import authReducer from './authReducer';
import selectedReducer from './selectedReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  auth: authReducer,
  selected: selectedReducer,
  history: historyReducer
});
