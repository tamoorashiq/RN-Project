import {ADD_USER} from './../types';

const initialState = {
  user: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
