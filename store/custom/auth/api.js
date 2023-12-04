import { MainApiService, ApiServiceMultipart } from "./../../API"

async function login(paylaod) {
  const resp = await MainApiService.post(`/api/v1/login/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function signup(paylaod) {
  const resp = await MainApiService.post(`/api/v1/signup/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function resetPassword(paylaod) {
  const resp = await MainApiService.post(`/api/v1/reset_password/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function validateOtp(paylaod) {
  const resp = await MainApiService.post(`/api/v1/validate-otp/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function confirmResetPassword(paylaod) {
  const resp = await MainApiService.post(
    `/api/v1/confirm_reset_password/`,
    paylaod
  )
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function changePassword(paylaod) {
  const resp = await MainApiService.post(`/rest-auth/password/change/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function updateProfile(paylaod) {
  const resp = await ApiServiceMultipart.post(`/api/v1/profile/`, paylaod)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function getProfile() {
  const resp = await MainApiService.get(`/api/v1/profile/`)
  if (resp?.data) return resp?.data
  console.log("resp ", resp)
}

async function getAllProfiles() {
  const resp = await MainApiService.get(`/api/v1/all-profiles/`)
  if (resp?.data) return resp?.data
}

async function deleteUser() {
  const resp = await MainApiService.delete(`/api/v1/user/`)
  return resp
}

async function regenerateOTP(body) {
  const resp = await MainApiService.post(`/api/v1/regenerate-otp/`, body)
  return resp
}

export const apiService = {
  login,
  signup,
  resetPassword,
  confirmResetPassword,
  updateProfile,
  getProfile,
  getAllProfiles,
  changePassword,
  validateOtp,
  deleteUser,
  regenerateOTP
}
