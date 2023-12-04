import {
  ADD_ITEMS,
  ADD_STATES,
  ADD_CITIES,
  ADD_ALL_CATEGORIES,
  ADD_USER_ITEMS
} from "./../types"

const initialState = {
  items: null,
  states: null,
  cities: null,
  allCategories: null,
  userItems: null
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      return { ...state, items: action.payload }
    case ADD_USER_ITEMS:
      return { ...state, userItems: action.payload }
    case ADD_STATES:
      return { ...state, states: action.payload }
    case ADD_CITIES:
      return { ...state, cities: action.payload }
    case ADD_ALL_CATEGORIES:
      return { ...state, allCategories: action.payload }

    default:
      return state
  }
}
