import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"

export const addNotificationDevice = createAsyncThunk(
  "notification/add-device",
  async payload => {
    try {
      const response = await apiService.addNotificationDevice(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during getAllProducts."
      )
    }
  }
)
export const sendNotification = createAsyncThunk(
  "notification/send",
  async payload => {
    try {
      const response = await apiService.sendNotification(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during sendNotification."
      )
    }
  }
)

export const getNotifications = createAsyncThunk(
  "notification/get-all",
  async payload => {
    try {
      const response = await apiService.getNotifications(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during getNotifications."
      )
    }
  }
)

export const markAsRead = createAsyncThunk(
  "notification/mark-as-read",
  async payload => {
    try {
      const response = await apiService.markAsRead(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during markAsRead."
      )
    }
  }
)

const initialState = {
  addNotificationDeviceApi: { loading: "idle", error: null },
  sendNotificationApi: { loading: "idle", error: null },
  getNotificationsApi: { loading: "idle", error: null },
  markAsReadApi: { loading: "idle", error: null },
  notifications: {}
}

// Creating the slice for the model Notifications
const notifications = createSlice({
  name: "appNotifications",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [addNotificationDevice.pending]: (state, action) => {
      if (state.addNotificationDeviceApi.loading === "idle") {
        state.addNotificationDeviceApi.loading = "pending"
      }
    },
    [addNotificationDevice.fulfilled]: (state, action) => {
      if (state.addNotificationDeviceApi.loading === "pending") {
        // update Pets array with new pet list data
        state.addNotificationDeviceApi.loading = "idle"
      }
    },
    [addNotificationDevice.rejected]: (state, action) => {
      if (state.addNotificationDeviceApi.loading === "pending") {
        state.addNotificationDeviceApi.error = action.error
        state.addNotificationDeviceApi.loading = "idle"
      }
    },
    [markAsRead.pending]: (state, action) => {
      if (state.markAsReadApi.loading === "idle") {
        state.markAsReadApi.loading = "pending"
      }
    },
    [markAsRead.fulfilled]: (state, action) => {
      if (state.markAsReadApi.loading === "pending") {
        // update Pets array with new pet list data
        state.markAsReadApi.loading = "idle"
      }
    },
    [markAsRead.rejected]: (state, action) => {
      if (state.markAsReadApi.loading === "pending") {
        state.markAsReadApi.error = action.error
        state.markAsReadApi.loading = "idle"
      }
    },
    [sendNotification.pending]: (state, action) => {
      if (state.sendNotificationApi.loading === "idle") {
        state.sendNotificationApi.loading = "pending"
      }
    },
    [sendNotification.fulfilled]: (state, action) => {
      if (state.sendNotificationApi.loading === "pending") {
        // update Pets array with new pet list data
        state.sendNotificationApi.loading = "idle"
      }
    },
    [sendNotification.rejected]: (state, action) => {
      if (state.sendNotificationApi.loading === "pending") {
        state.sendNotificationApi.error = action.error
        state.sendNotificationApi.loading = "idle"
      }
    },
    [getNotifications.pending]: (state, action) => {
      if (state.getNotificationsApi.loading === "idle") {
        state.getNotificationsApi.loading = "pending"
      }
    },
    [getNotifications.fulfilled]: (state, action) => {
      if (state.getNotificationsApi.loading === "pending") {
        // update Pets array with new pet list data
        state.getNotificationsApi.loading = "idle"
        state.notifications = action.payload
      }
    },
    [getNotifications.rejected]: (state, action) => {
      if (state.getNotificationsApi.loading === "pending") {
        state.getNotificationsApi.error = action.error
        state.getNotificationsApi.loading = "idle"
      }
    }
  }
})
export default {
  addNotificationDevice,
  sendNotification,
  slice: notifications
}
