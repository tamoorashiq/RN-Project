import {ADD_USERS} from './../types';

const initialState = {
  users: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {...state, users: action.payload};
    default:
      return state;
  }
};
