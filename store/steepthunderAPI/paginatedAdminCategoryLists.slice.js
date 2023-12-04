import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_admin_categories_list = createAsyncThunk(
  "paginatedAdminCategoryLists/api_v1_admin_categories_list",
  async payload => {
    const response = await apiService.api_v1_admin_categories_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedAdminCategoryListsSlice = createSlice({
  name: "paginatedAdminCategoryLists",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_admin_categories_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_admin_categories_list,
  slice: paginatedAdminCategoryListsSlice
}
