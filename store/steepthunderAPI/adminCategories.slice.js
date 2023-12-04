import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_admin_categories_create = createAsyncThunk(
  "adminCategories/api_v1_admin_categories_create",
  async payload => {
    const response = await apiService.api_v1_admin_categories_create(payload)
    return response.data
  }
)
export const api_v1_admin_categories_retrieve = createAsyncThunk(
  "adminCategories/api_v1_admin_categories_retrieve",
  async payload => {
    const response = await apiService.api_v1_admin_categories_retrieve(payload)
    return response.data
  }
)
export const api_v1_admin_categories_update = createAsyncThunk(
  "adminCategories/api_v1_admin_categories_update",
  async payload => {
    const response = await apiService.api_v1_admin_categories_update(payload)
    return response.data
  }
)
export const api_v1_admin_categories_partial_update = createAsyncThunk(
  "adminCategories/api_v1_admin_categories_partial_update",
  async payload => {
    const response = await apiService.api_v1_admin_categories_partial_update(
      payload
    )
    return response.data
  }
)
export const api_v1_admin_categories_destroy = createAsyncThunk(
  "adminCategories/api_v1_admin_categories_destroy",
  async payload => {
    const response = await apiService.api_v1_admin_categories_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const adminCategoriesSlice = createSlice({
  name: "adminCategories",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_admin_categories_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_categories_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_categories_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_admin_categories_create,
  api_v1_admin_categories_retrieve,
  api_v1_admin_categories_update,
  api_v1_admin_categories_partial_update,
  api_v1_admin_categories_destroy,
  slice: adminCategoriesSlice
}
