import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_admin_flag_items_create = createAsyncThunk(
  "adminFlags/api_v1_admin_flag_items_create",
  async payload => {
    const response = await apiService.api_v1_admin_flag_items_create(payload)
    return response.data
  }
)
export const api_v1_admin_flag_items_retrieve = createAsyncThunk(
  "adminFlags/api_v1_admin_flag_items_retrieve",
  async payload => {
    const response = await apiService.api_v1_admin_flag_items_retrieve(payload)
    return response.data
  }
)
export const api_v1_admin_flag_items_update = createAsyncThunk(
  "adminFlags/api_v1_admin_flag_items_update",
  async payload => {
    const response = await apiService.api_v1_admin_flag_items_update(payload)
    return response.data
  }
)
export const api_v1_admin_flag_items_partial_update = createAsyncThunk(
  "adminFlags/api_v1_admin_flag_items_partial_update",
  async payload => {
    const response = await apiService.api_v1_admin_flag_items_partial_update(
      payload
    )
    return response.data
  }
)
export const api_v1_admin_flag_items_destroy = createAsyncThunk(
  "adminFlags/api_v1_admin_flag_items_destroy",
  async payload => {
    const response = await apiService.api_v1_admin_flag_items_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const adminFlagsSlice = createSlice({
  name: "adminFlags",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_admin_flag_items_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_flag_items_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_flag_items_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_flag_items_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_flag_items_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_flag_items_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_flag_items_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_admin_flag_items_create,
  api_v1_admin_flag_items_retrieve,
  api_v1_admin_flag_items_update,
  api_v1_admin_flag_items_partial_update,
  api_v1_admin_flag_items_destroy,
  slice: adminFlagsSlice
}
