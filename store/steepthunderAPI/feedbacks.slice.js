import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_feedbacks_create = createAsyncThunk(
  "feedbacks/api_v1_feedbacks_create",
  async payload => {
    const response = await apiService.api_v1_feedbacks_create(payload)
    return response.data
  }
)
export const api_v1_feedbacks_retrieve = createAsyncThunk(
  "feedbacks/api_v1_feedbacks_retrieve",
  async payload => {
    const response = await apiService.api_v1_feedbacks_retrieve(payload)
    return response.data
  }
)
export const api_v1_feedbacks_update = createAsyncThunk(
  "feedbacks/api_v1_feedbacks_update",
  async payload => {
    const response = await apiService.api_v1_feedbacks_update(payload)
    return response.data
  }
)
export const api_v1_feedbacks_partial_update = createAsyncThunk(
  "feedbacks/api_v1_feedbacks_partial_update",
  async payload => {
    const response = await apiService.api_v1_feedbacks_partial_update(payload)
    return response.data
  }
)
export const api_v1_feedbacks_destroy = createAsyncThunk(
  "feedbacks/api_v1_feedbacks_destroy",
  async payload => {
    const response = await apiService.api_v1_feedbacks_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_feedbacks_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_feedbacks_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_feedbacks_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_feedbacks_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_feedbacks_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_feedbacks_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_feedbacks_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_feedbacks_create,
  api_v1_feedbacks_retrieve,
  api_v1_feedbacks_update,
  api_v1_feedbacks_partial_update,
  api_v1_feedbacks_destroy,
  slice: feedbacksSlice
}
