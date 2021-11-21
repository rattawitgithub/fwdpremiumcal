import { CAL_SELECTED } from '../actions/types';
import moment from 'moment';

const INITIAL_STATE = {
  calculated: {
    calterm: {
      dob: moment(new Date()).format('YYYY-MM-DD'),
      genderCd: '',
      planCode: '',
      premiumPerYear: 0,
      paymentFrequency: '',
      saPerYear: 0
    },
    result: {}
  }
};

const selectedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAL_SELECTED:
      return { ...state, calculated: action.payload };
    default:
      return state;
  }
};
export default selectedReducer;
