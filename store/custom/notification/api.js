import { MainApiService } from "./../../API"

async function addNotificationDevice(payload) {
  const resp = await MainApiService.post(`/api/v1/device/`, payload)
  if (resp?.data) return resp?.data
}

async function sendNotification(payload) {
  const resp = await MainApiService.post(`/api/v1/send_notification/`, payload)
  if (resp?.data) return resp?.data
}

async function getNotifications(payload) {
  const resp = await MainApiService.get(
    payload || `/api/v1/notification/`,
    payload
  )
  if (resp?.data) return resp?.data
}

export const apiService = {
  addNotificationDevice,
  sendNotification,
  getNotifications
}
