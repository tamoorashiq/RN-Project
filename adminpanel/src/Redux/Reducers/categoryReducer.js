import { ADD_CATEGORIES } from "./../types"

const initialState = {
  categories: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return { ...state, categories: action.payload }
    default:
      return state
  }
}
