import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
import * as appStartApiService from "./../appStart/api"
import { setDataStorage, getDataStorage } from "../../../utils/storage"

export const login = createAsyncThunk("auth/login", async payload => {
  try {
    let response = await apiService.login(payload)
    console.log("response ", response)
    setDataStorage("@key", response.key)
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(JSON.stringify(error) || "An error occurred during signup.")
  }
})

export const signup = createAsyncThunk("auth/signup", async payload => {
  try {
    const response = await apiService.signup(payload)
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(JSON.stringify(error) || "An error occurred during signup.")
  }
})

export const setAuth = createAsyncThunk("auth/set", async payload => {
  try {
    return payload
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(
      JSON.stringify(error) || "An error occurred during setAuth."
    )
  }
})

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async payload => {
    try {
      let response = await apiService.updateProfile(payload)
      if (response.state && response.city) {
        const locationsResp =
          await appStartApiService.apiService.getCityAndStateByIds(
            response.state,
            response.city
          )

        response = {
          ...response,
          cityData: locationsResp.city,
          stateData: locationsResp.state
        }
      }
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during updateProfile."
      )
    }
  }
)

export const getProfile = createAsyncThunk("auth/getProfile", async payload => {
  try {
    let response = await apiService.getProfile()
    if (response.state && response.city) {
      const locationsResp =
        await appStartApiService.apiService.getCityAndStateByIds(
          response.state,
          response.city
        )

      response = {
        ...response,
        cityData: locationsResp.city,
        stateData: locationsResp.state
      }
    }
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(
      JSON.stringify(error) || "An error occurred during updateProfile."
    )
  }
})
export const getAllProfiles = createAsyncThunk(
  "auth/getAllProfiles",
  async payload => {
    try {
      const response = await apiService.getAllProfiles()
      // console.log(response, "response")
      return response
    } catch (error) {
      // console.log(error, "response error")
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during updateProfile."
      )
    }
  }
)

// defining the initial state: pets data will be saved in the let entities' list
const initialState = {
  user: null,
  isAuth: false,
  allProfiles: [],
  api: { loading: "idle", error: null },
  apiProfile: { loading: "idle", error: null },
  apiAllProfile: { loading: "idle", error: null }
}

// Creating the slice for the model Pet
const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        console.log("action.payload ", action.payload)
        state.user = action.payload.user
        state.isAuth = true
        state.api.loading = "idle"
      }
    },
    [login.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [signup.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [signup.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        console.log("action.payload ", action.payload)
        state.user = action.payload
        state.api.loading = "idle"
      }
    },
    [signup.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [updateProfile.pending]: (state, action) => {
      if (state.apiProfile.loading === "idle") {
        state.apiProfile.loading = "pending"
      }
    },
    [updateProfile.fulfilled]: (state, action) => {
      if (state.apiProfile.loading === "pending") {
        // update Pets array with new pet list data
        state.user = action.payload
        state.apiProfile.loading = "idle"
      }
    },
    [updateProfile.rejected]: (state, action) => {
      if (state.apiProfile.loading === "pending") {
        state.apiProfile.error = action.error
        state.apiProfile.loading = "idle"
      }
    },

    [getProfile.pending]: (state, action) => {
      if (state.apiProfile.loading === "idle") {
        state.apiProfile.loading = "pending"
      }
    },
    [getProfile.fulfilled]: (state, action) => {
      if (state.apiProfile.loading === "pending") {
        // update Pets array with new pet list data
        state.user = action.payload
        state.apiProfile.loading = "idle"
      }
    },
    [getProfile.rejected]: (state, action) => {
      if (state.apiProfile.loading === "pending") {
        state.apiProfile.error = action.error
        state.apiProfile.loading = "idle"
      }
    },
    [getAllProfiles.pending]: (state, action) => {
      if (state.apiAllProfile.loading === "idle") {
        state.apiAllProfile.loading = "pending"
      }
    },
    [getAllProfiles.fulfilled]: (state, action) => {
      if (state.apiAllProfile.loading === "pending") {
        // update Pets array with new pet list data
        state.allProfiles = action.payload
        state.apiAllProfile.loading = "idle"
      }
    },
    [getAllProfiles.rejected]: (state, action) => {
      if (state.apiAllProfile.loading === "pending") {
        state.apiAllProfile.error = action.error
        state.apiAllProfile.loading = "idle"
      }
    },

    [setAuth.fulfilled]: (state, action) => {
      console.log("action ", action.payload)
      state.isAuth = action.payload
    }
  }
})
export default {
  login,
  updateProfile,
  getProfile,
  slice: auth
}
