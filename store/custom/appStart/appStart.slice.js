import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"

export const getStates = createAsyncThunk(
  "appStart/getStates",
  async payload => await apiService.getStates()
)

export const getCitiesByState = createAsyncThunk(
  "auth/getCities",
  async payload => {
    try {
      const response = await apiService.getCitiesByState(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during signup."
      )
    }
  }
)

export const getTermsNConditions = createAsyncThunk(
  "appStart/getTermsNConditions",
  async payload => await apiService.getTermsNConditions()
)

export const getPrivacyPolicy = createAsyncThunk(
  "appStart/getPrivacyPolicy",
  async payload => await apiService.getPrivacyPolicy()
)
// defining the initial state: pets data will be saved in the let entities' list
const initialState = {
  availableStates: [],
  availableCities: [],
  termsNConditions: [],
  privacyPolicy: [],
  api: { loading: "idle", error: null }
}

// Creating the slice for the model Pet
const appStart = createSlice({
  name: "appStart",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getStates.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getStates.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.availableStates = action.payload
        state.api.loading = "idle"
      }
    },
    [getStates.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [getCitiesByState.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getCitiesByState.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.availableCities = action.payload
        state.api.loading = "idle"
      }
    },
    [getCitiesByState.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [getTermsNConditions.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getTermsNConditions.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.termsNConditions = action.payload
        state.api.loading = "idle"
      }
    },
    [getTermsNConditions.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [getPrivacyPolicy.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getPrivacyPolicy.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.privacyPolicy = action.payload
        state.api.loading = "idle"
      }
    },
    [getPrivacyPolicy.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  getStates,
  getCitiesByState,
  slice: appStart
}
