import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const modules_terms_and_conditions_list = createAsyncThunk(
  "paginatedTermAndConditionLists/modules_terms_and_conditions_list",
  async payload => {
    const response = await apiService.modules_terms_and_conditions_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedTermAndConditionListsSlice = createSlice({
  name: "paginatedTermAndConditionLists",
  initialState,
  reducers: {},
  extraReducers: {
    [modules_terms_and_conditions_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [modules_terms_and_conditions_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [modules_terms_and_conditions_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  modules_terms_and_conditions_list,
  slice: paginatedTermAndConditionListsSlice
}
