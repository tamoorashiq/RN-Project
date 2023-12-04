import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const modules_terms_and_conditions_retrieve = createAsyncThunk(
  "termAndConditions/modules_terms_and_conditions_retrieve",
  async payload => {
    const response = await apiService.modules_terms_and_conditions_retrieve(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const termAndConditionsSlice = createSlice({
  name: "termAndConditions",
  initialState,
  reducers: {},
  extraReducers: {
    [modules_terms_and_conditions_retrieve.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [modules_terms_and_conditions_retrieve.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [modules_terms_and_conditions_retrieve.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  modules_terms_and_conditions_retrieve,
  slice: termAndConditionsSlice
}
