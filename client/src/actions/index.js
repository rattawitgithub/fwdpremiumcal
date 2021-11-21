import his from 'src/apis/his';
import {
  SIGN_IN,
  SIGN_OUT,
  CAL_SELECTED,
  CREATE_HIS,
  FETCH_HISS
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const selectCalculation = term => {
  return {
    type: CAL_SELECTED,
    payload: term
  };
};

export const createHistory = values => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await his.post('/calculationHis', { ...values, userId });

  dispatch({ type: CREATE_HIS, payload: response.data });
};

export const fetchHistorys = () => async dispatch => {
  const response = await his.get('/calculationHis');

  dispatch({ type: FETCH_HISS, payload: response.data });
};
