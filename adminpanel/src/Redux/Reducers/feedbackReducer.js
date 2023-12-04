import { ADD_FEEDBACK } from "./../types"

const initialState = {
  feedbacks: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FEEDBACK:
      return { ...state, feedbacks: action.payload }
    default:
      return state
  }
}
