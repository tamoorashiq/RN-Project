import axios from "axios"
import { getDataStorage } from "./../utils/storage"

import { getGlobalOptions } from "@options"

const global = getGlobalOptions()
const BASE_URL = global.url

export const MainApiService = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})

export const ApiServiceMultipart = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "multipart/form-data" }
})

const onRequest = async config => {
  // config.headers.authorization = `Token ${"ca071ff81c0e525e3c0bb42f9c2d6f6eefacd717"}`
  // return config
  let key = await getDataStorage("@key")
  // console.log("kkey ", key)
  if (key) {
    config.headers.authorization = `Token ${key}`
  }
  return config
}

MainApiService.interceptors.request.use(onRequest)
ApiServiceMultipart.interceptors.request.use(onRequest)

MainApiService.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

ApiServiceMultipart.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)
