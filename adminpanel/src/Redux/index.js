import { applyMiddleware, combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"

import { persistStore, persistReducer } from "redux-persist"
import thunk from "redux-thunk"
import localStorage from "redux-persist/es/storage"
import userReducer from "./Reducers/userReducer.js"
import AllUserReducer from "./Reducers/AllUserReducer.js"
import categoryReducer from "./Reducers/categoryReducer.js"
import feedbackReducer from "./Reducers/feedbackReducer.js"
import flagReducer from "./Reducers/flagReducer.js"
import itemReducer from "./Reducers/itemReducer.js"

const persistConfig = {
  key: "root",
  storage: localStorage
}
let rootReducer = combineReducers({
  userReducer,
  AllUserReducer,
  categoryReducer,
  feedbackReducer,
  flagReducer,
  itemReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
const persistor = persistStore(store)

export { store, persistor }
