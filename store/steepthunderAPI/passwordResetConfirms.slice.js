import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_confirm_reset_password_create = createAsyncThunk(
  "passwordResetConfirms/api_v1_confirm_reset_password_create",
  async payload => {
    const response = await apiService.api_v1_confirm_reset_password_create(
      payload
    )
    return response.data
  }
)
export const rest_auth_password_reset_confirm_create = createAsyncThunk(
  "passwordResetConfirms/rest_auth_password_reset_confirm_create",
  async payload => {
    const response = await apiService.rest_auth_password_reset_confirm_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const passwordResetConfirmsSlice = createSlice({
  name: "passwordResetConfirms",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_confirm_reset_password_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_confirm_reset_password_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_confirm_reset_password_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [rest_auth_password_reset_confirm_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [rest_auth_password_reset_confirm_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [rest_auth_password_reset_confirm_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_confirm_reset_password_create,
  rest_auth_password_reset_confirm_create,
  slice: passwordResetConfirmsSlice
}