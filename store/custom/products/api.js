import { MainApiService, ApiServiceMultipart } from "./../../API"

async function getAllProducts() {
  const resp = await MainApiService.get(`/api/v1/products/`, {})
  if (resp?.data) return resp?.data?.results || []
}

async function getPublicProducts() {
  const resp = await MainApiService.get(`/api/v1/public-products/`, {})
  if (resp?.data) return resp?.data?.results || []
}

async function getProductsByUser(payload) {
  const queryParams = new URLSearchParams(payload).toString()
  console.log("queryParams ", queryParams)
  const resp = await MainApiService.get(
    `/api/v1/products/?user=${payload.user}`
  )
  if (resp?.data) return resp?.data
}

async function getUserReviews(payload) {
  let result = []

  let pageNo = 1
  while (true) {
    const resp = await MainApiService.get(
      `/api/v1/reviews/?page=${pageNo}&user=${payload.user}`
    )
    if (resp?.data) {
      result = [...result, ...resp?.data.results]

      if (!resp?.data.next) {
        break
      } else {
        pageNo += 1
      }
    }
  }

  return result
}

async function addUserReviews(payload) {
  const resp = await MainApiService.post(`/api/v1/reviews/`, payload)
  if (resp?.data) return resp?.data
}

async function getMyProducts() {
  const resp = await MainApiService.get(`/api/v1/products/my_products/`, {})
  if (resp?.data) return resp?.data || []
}

async function getAllCategories(page = 1) {
  const resp = await MainApiService.get(`/api/v1/categories/?page=${page}`, {})
  if (resp?.data) return resp?.data
}

async function getAllProductsWithFilters(filters) {
  const queryParams = new URLSearchParams(filters).toString()
  const resp = await MainApiService.get(`/api/v1/products/?${queryParams}`)
  if (resp?.data) return resp?.data?.results || []
}

async function addNewProduct(payload) {
  const resp = await ApiServiceMultipart.post(`/api/v1/products/`, payload)
  if (resp?.data) return resp?.data
}

async function updateProduct(payload) {
  let id = payload.id

  console.log("payload ", payload.data)
  const resp = await ApiServiceMultipart.put(
    `/api/v1/products/${id}/`,
    payload.data
  )
  if (resp?.data) return resp?.data
}

async function flagProduct(payload) {
  const resp = await MainApiService.post(`/api/v1/flag-product/`, payload)
  if (resp?.data) return resp?.data
}

export const apiService = {
  getAllProducts,
  getAllCategories,
  getAllProductsWithFilters,
  getMyProducts,
  addNewProduct,
  getProductsByUser,
  getUserReviews,
  updateProduct,
  addUserReviews,
  flagProduct,
  getPublicProducts
}
