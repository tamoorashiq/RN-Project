import { ADD_FLAG } from "./../types"

const initialState = {
  flags: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLAG:
      return { ...state, flags: action.payload }
    default:
      return state
  }
}
