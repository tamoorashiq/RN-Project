import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_admin_products_list = createAsyncThunk(
  "paginatedAdminProductLists/api_v1_admin_products_list",
  async payload => {
    const response = await apiService.api_v1_admin_products_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedAdminProductListsSlice = createSlice({
  name: "paginatedAdminProductLists",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_admin_products_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_products_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_products_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_admin_products_list,
  slice: paginatedAdminProductListsSlice
}
