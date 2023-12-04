import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const api_v1_flag_product_create = createAsyncThunk(
  "productFlags/api_v1_flag_product_create",
  async payload => {
    const response = await apiService.api_v1_flag_product_create(payload)
    return response.data
  }
)
export const api_v1_flag_product_retrieve = createAsyncThunk(
  "productFlags/api_v1_flag_product_retrieve",
  async payload => {
    const response = await apiService.api_v1_flag_product_retrieve(payload)
    return response.data
  }
)
export const api_v1_flag_product_update = createAsyncThunk(
  "productFlags/api_v1_flag_product_update",
  async payload => {
    const response = await apiService.api_v1_flag_product_update(payload)
    return response.data
  }
)
export const api_v1_flag_product_partial_update = createAsyncThunk(
  "productFlags/api_v1_flag_product_partial_update",
  async payload => {
    const response = await apiService.api_v1_flag_product_partial_update(
      payload
    )
    return response.data
  }
)
export const api_v1_flag_product_destroy = createAsyncThunk(
  "productFlags/api_v1_flag_product_destroy",
  async payload => {
    const response = await apiService.api_v1_flag_product_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const productFlagsSlice = createSlice({
  name: "productFlags",
  initialState,
  reducers: {},
  extraReducers: {
    [api_v1_flag_product_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_flag_product_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_flag_product_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_flag_product_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_partial_update.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_flag_product_partial_update.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_partial_update.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_destroy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [api_v1_flag_product_destroy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = state.entities.filter(
          record => record.id !== action.meta.arg?.id
        )
        state.api.loading = "idle"
      }
    },
    [api_v1_flag_product_destroy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  api_v1_flag_product_create,
  api_v1_flag_product_retrieve,
  api_v1_flag_product_update,
  api_v1_flag_product_partial_update,
  api_v1_flag_product_destroy,
  slice: productFlagsSlice
}
