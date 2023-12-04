import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_admin_users_create = createAsyncThunk(
  "adminUsers/api_v1_admin_users_create",
  async payload => {
    const response = await apiService.api_v1_admin_users_create(payload)
    return response.data
  }
)
export const api_v1_admin_users_retrieve = createAsyncThunk(
  "adminUsers/api_v1_admin_users_retrieve",
  async payload => {
    const response = await apiService.api_v1_admin_users_retrieve(payload)
    return response.data
  }
)
export const api_v1_admin_users_update = createAsyncThunk(
  "adminUsers/api_v1_admin_users_update",
  async payload => {
    const response = await apiService.api_v1_admin_users_update(payload)
    return response.data
  }
)
export const api_v1_admin_users_partial_update = createAsyncThunk(
  "adminUsers/api_v1_admin_users_partial_update",
  async payload => {
    const response = await apiService.api_v1_admin_users_partial_update(payload)
    return response.data
  }
)
export const api_v1_admin_users_destroy = createAsyncThunk(
  "adminUsers/api_v1_admin_users_destroy",
  async payload => {
    const response = await apiService.api_v1_admin_users_destroy(payload)
    return response.data
  }
)
export const api_v1_admin_users_add_user_create = createAsyncThunk(
  "adminUsers/api_v1_admin_users_add_user_create",
  async payload => {
    const response = await apiService.api_v1_admin_users_add_user_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_admin_users_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_add_user_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_admin_users_add_user_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_admin_users_add_user_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_admin_users_create,
  api_v1_admin_users_retrieve,
  api_v1_admin_users_update,
  api_v1_admin_users_partial_update,
  api_v1_admin_users_destroy,
  api_v1_admin_users_add_user_create,
  slice: adminUsersSlice
}
