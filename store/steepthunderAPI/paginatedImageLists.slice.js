import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const modules_camera_photos_user_list = createAsyncThunk(
  "paginatedImageLists/modules_camera_photos_user_list",
  async payload => {
    const response = await apiService.modules_camera_photos_user_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedImageListsSlice = createSlice({
  name: "paginatedImageLists",
  initialState,
  reducers: {},
  extraReducers: {
    [modules_camera_photos_user_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [modules_camera_photos_user_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [modules_camera_photos_user_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  modules_camera_photos_user_list,
  slice: paginatedImageListsSlice
}
