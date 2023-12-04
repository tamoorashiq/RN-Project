import { MainApiService } from "./../../API"

async function getStates() {
  const resp = await MainApiService.get(`/api/v1/states/`, {})
  if (resp.data) return resp.data
}

async function getTermsNConditions() {
  const resp = await MainApiService.get(`/modules/terms-and-conditions/`, {})
  if (resp.data) return resp.data
}

async function getPrivacyPolicy() {
  const resp = await MainApiService.get(`/modules/privacy-policy/`, {})
  if (resp.data) return resp.data
}

async function getCitiesByState(state) {
  const resp = await MainApiService.get(`/api/v1/city/?state=${state}`, {})
  if (resp.data) return resp.data
}

async function getCityAndStateByIds(stateId, cityId) {
  const cityResp = await MainApiService.get(`/api/v1/city/${cityId}/`, {})
  const city = cityResp.data || null

  const stateResp = await MainApiService.get(`/api/v1/states/${stateId}/`, {})
  const state = stateResp.data || null

  return { city, state }
}

export const apiService = {
  getStates,
  getTermsNConditions,
  getPrivacyPolicy,
  getCitiesByState,
  getCityAndStateByIds
}
