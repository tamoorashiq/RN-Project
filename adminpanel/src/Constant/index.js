export const IS_DEV = false
let DEV_API_URL = "http://localhost:8000/"
export const API_URL = IS_DEV
  ? DEV_API_URL
  : "https://steep-thunder-40040.botics.co"

//USERS
export const GET_ALL_USERS_API = API_URL + "/api/v1/admin/users/" // GET METHOD
export const PUT_USER_API = API_URL + "/api/v1/admin/users/:id/" // PUT METHOD
export const DELETE_USER_API = API_URL + "/api/v1/admin/users/:id/" // DELETE METHOD
export const ADD_USER_API = API_URL + "/api/v1/admin/users/add_user/"

//AUTH
export const LOGIN_API = API_URL + "/api/v1/login/" //POST METHOD

//CATEGORY
export const ADD_CATEGORY_API = API_URL + "/api/v1/admin/categories/" //POST METHOD
export const GET_ALL_CATEGORIES_API = API_URL + "/api/v1/admin/categories/" //GET METHOD
export const DELETE_CATEGORY_API = API_URL + "/api/v1/admin/categories/:id/" //DELETE METHOD
export const EDIT_CATEGORY_API = API_URL + "/api/v1/admin/categories/:id/" //PUT METHOD

// FEEDBACK
export const GET_ALL_FEEDBACK_API = API_URL + "/api/v1/feedbacks/" //GET METHOD
export const REPLY_FEEDBACK_API = API_URL + "/api/v1/feedbacks/:id/" //PUT METHOD

// FLAG

export const GET_ALL_FLAG_API = API_URL + "/api/v1/admin/flag-items/"

// MANAGE ITEMS

export const GET_MANAGE_ITEMS_API = API_URL + "/api/v1/admin/products/"
export const GET_MANAGE_ITEM_API = API_URL + "/api/v1/admin/products/:id/"
export const GET_STATES_API = API_URL + "/api/v1/states/"
export const GET_CITIES_API = API_URL + "/api/v1/city/?state=:state"
export const GET_CATEGORIES_API = API_URL + "/api/v1/categories/"
