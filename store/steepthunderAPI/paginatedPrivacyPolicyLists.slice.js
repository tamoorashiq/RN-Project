import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const modules_privacy_policy_list = createAsyncThunk(
  "paginatedPrivacyPolicyLists/modules_privacy_policy_list",
  async payload => {
    const response = await apiService.modules_privacy_policy_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedPrivacyPolicyListsSlice = createSlice({
  name: "paginatedPrivacyPolicyLists",
  initialState,
  reducers: {},
  extraReducers: {
    [modules_privacy_policy_list.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [modules_privacy_policy_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities = [
          ...state.entities.filter(record => record.id !== action.payload.id),
          action.payload
        ]
        state.api.loading = "idle"
      }
    },
    [modules_privacy_policy_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  modules_privacy_policy_list,
  slice: paginatedPrivacyPolicyListsSlice
}
