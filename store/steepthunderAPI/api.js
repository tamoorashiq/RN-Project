import axios from "axios"
const steepthunderAPI = axios.create({
  baseURL: "https://swapster-40040.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function api_docs_schema_retrieve(payload) {
  return steepthunderAPI.get(`/api-docs/schema/`, {
    params: { lang: payload.lang }
  })
}
function api_v1_admin_categories_list(payload) {
  return steepthunderAPI.get(`/api/v1/admin/categories/`, {
    params: { page: payload.page, search: payload.search }
  })
}
function api_v1_admin_categories_create(payload) {
  return steepthunderAPI.post(`/api/v1/admin/categories/`, payload.data)
}
function api_v1_admin_categories_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/admin/categories/${payload.id}/`)
}
function api_v1_admin_categories_update(payload) {
  return steepthunderAPI.put(
    `/api/v1/admin/categories/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_categories_partial_update(payload) {
  return steepthunderAPI.patch(
    `/api/v1/admin/categories/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_categories_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/admin/categories/${payload.id}/`)
}
function api_v1_admin_flag_items_list(payload) {
  return steepthunderAPI.get(`/api/v1/admin/flag-items/`, {
    params: {
      page: payload.page,
      reason: payload.reason,
      search: payload.search
    }
  })
}
function api_v1_admin_flag_items_create(payload) {
  return steepthunderAPI.post(`/api/v1/admin/flag-items/`, payload.data)
}
function api_v1_admin_flag_items_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/admin/flag-items/${payload.id}/`)
}
function api_v1_admin_flag_items_update(payload) {
  return steepthunderAPI.put(
    `/api/v1/admin/flag-items/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_flag_items_partial_update(payload) {
  return steepthunderAPI.patch(
    `/api/v1/admin/flag-items/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_flag_items_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/admin/flag-items/${payload.id}/`)
}
function api_v1_admin_products_list(payload) {
  return steepthunderAPI.get(`/api/v1/admin/products/`, {
    params: {
      category: payload.category,
      category__in: payload.category__in,
      city: payload.city,
      page: payload.page,
      search: payload.search,
      state: payload.state,
      user: payload.user
    }
  })
}
function api_v1_admin_products_create(payload) {
  return steepthunderAPI.post(`/api/v1/admin/products/`, payload.data)
}
function api_v1_admin_products_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/admin/products/${payload.id}/`)
}
function api_v1_admin_products_update(payload) {
  return steepthunderAPI.put(
    `/api/v1/admin/products/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_products_partial_update(payload) {
  return steepthunderAPI.patch(
    `/api/v1/admin/products/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_products_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/admin/products/${payload.id}/`)
}
function api_v1_admin_users_list(payload) {
  return steepthunderAPI.get(`/api/v1/admin/users/`, {
    params: { page: payload.page, search: payload.search }
  })
}
function api_v1_admin_users_create(payload) {
  return steepthunderAPI.post(`/api/v1/admin/users/`, payload.data)
}
function api_v1_admin_users_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/admin/users/${payload.id}/`)
}
function api_v1_admin_users_update(payload) {
  return steepthunderAPI.put(`/api/v1/admin/users/${payload.id}/`, payload.data)
}
function api_v1_admin_users_partial_update(payload) {
  return steepthunderAPI.patch(
    `/api/v1/admin/users/${payload.id}/`,
    payload.data
  )
}
function api_v1_admin_users_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/admin/users/${payload.id}/`)
}
function api_v1_admin_users_add_user_create(payload) {
  return steepthunderAPI.post(`/api/v1/admin/users/add_user/`, payload.data)
}
function api_v1_categories_list(payload) {
  return steepthunderAPI.get(`/api/v1/categories/`, {
    params: { page: payload.page, search: payload.search }
  })
}
function api_v1_categories_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/categories/${payload.id}/`)
}
function api_v1_city_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/city/`)
}
function api_v1_confirm_reset_password_create(payload) {
  return steepthunderAPI.post(`/api/v1/confirm_reset_password/`, payload.data)
}
function api_v1_feedbacks_list(payload) {
  return steepthunderAPI.get(`/api/v1/feedbacks/`, {
    params: { page: payload.page }
  })
}
function api_v1_feedbacks_create(payload) {
  return steepthunderAPI.post(`/api/v1/feedbacks/`, payload.data)
}
function api_v1_feedbacks_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/feedbacks/${payload.id}/`)
}
function api_v1_feedbacks_update(payload) {
  return steepthunderAPI.put(`/api/v1/feedbacks/${payload.id}/`, payload.data)
}
function api_v1_feedbacks_partial_update(payload) {
  return steepthunderAPI.patch(`/api/v1/feedbacks/${payload.id}/`, payload.data)
}
function api_v1_feedbacks_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/feedbacks/${payload.id}/`)
}
function api_v1_flag_product_list(payload) {
  return steepthunderAPI.get(`/api/v1/flag-product/`, {
    params: { page: payload.page }
  })
}
function api_v1_flag_product_create(payload) {
  return steepthunderAPI.post(`/api/v1/flag-product/`, payload.data)
}
function api_v1_flag_product_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/flag-product/${payload.id}/`)
}
function api_v1_flag_product_update(payload) {
  return steepthunderAPI.put(
    `/api/v1/flag-product/${payload.id}/`,
    payload.data
  )
}
function api_v1_flag_product_partial_update(payload) {
  return steepthunderAPI.patch(
    `/api/v1/flag-product/${payload.id}/`,
    payload.data
  )
}
function api_v1_flag_product_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/flag-product/${payload.id}/`)
}
function api_v1_login_create(payload) {
  return steepthunderAPI.post(`/api/v1/login/`, payload.data)
}
function api_v1_products_list(payload) {
  return steepthunderAPI.get(`/api/v1/products/`, {
    params: {
      category: payload.category,
      category__in: payload.category__in,
      city: payload.city,
      page: payload.page,
      search: payload.search,
      state: payload.state,
      user: payload.user
    }
  })
}
function api_v1_products_create(payload) {
  return steepthunderAPI.post(`/api/v1/products/`, payload.data)
}
function api_v1_products_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/products/${payload.id}/`)
}
function api_v1_products_update(payload) {
  return steepthunderAPI.put(`/api/v1/products/${payload.id}/`, payload.data)
}
function api_v1_products_partial_update(payload) {
  return steepthunderAPI.patch(`/api/v1/products/${payload.id}/`, payload.data)
}
function api_v1_products_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/products/${payload.id}/`)
}
function api_v1_products_my_products_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/products/my_products/`)
}
function api_v1_profile_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/profile/`)
}
function api_v1_profile_create(payload) {
  return steepthunderAPI.post(`/api/v1/profile/`, payload.data)
}
function api_v1_public_products_list(payload) {
  return steepthunderAPI.get(`/api/v1/public-products/`, {
    params: { page: payload.page }
  })
}
function api_v1_public_products_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/public-products/${payload.id}/`)
}
function api_v1_regenerate_otp_create(payload) {
  return steepthunderAPI.post(`/api/v1/regenerate-otp/`)
}
function api_v1_reset_password_create(payload) {
  return steepthunderAPI.post(`/api/v1/reset_password/`)
}
function api_v1_reviews_list(payload) {
  return steepthunderAPI.get(`/api/v1/reviews/`, {
    params: { page: payload.page, search: payload.search, user: payload.user }
  })
}
function api_v1_reviews_create(payload) {
  return steepthunderAPI.post(`/api/v1/reviews/`, payload.data)
}
function api_v1_reviews_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/reviews/${payload.id}/`)
}
function api_v1_reviews_update(payload) {
  return steepthunderAPI.put(`/api/v1/reviews/${payload.id}/`, payload.data)
}
function api_v1_reviews_partial_update(payload) {
  return steepthunderAPI.patch(`/api/v1/reviews/${payload.id}/`, payload.data)
}
function api_v1_reviews_destroy(payload) {
  return steepthunderAPI.delete(`/api/v1/reviews/${payload.id}/`)
}
function api_v1_signup_create(payload) {
  return steepthunderAPI.post(`/api/v1/signup/`, payload.data)
}
function api_v1_states_retrieve(payload) {
  return steepthunderAPI.get(`/api/v1/states/`)
}
function api_v1_validate_otp_create(payload) {
  return steepthunderAPI.post(`/api/v1/validate-otp/`)
}
function modules_camera_photos_user_list(payload) {
  return steepthunderAPI.get(`/modules/camera/photos/user/`, {
    params: { page: payload.page }
  })
}
function modules_camera_photos_user_retrieve(payload) {
  return steepthunderAPI.get(`/modules/camera/photos/user/${payload.id}/`)
}
function modules_camera_upload_image_create(payload) {
  return steepthunderAPI.post(`/modules/camera/upload_image/`)
}
function modules_privacy_policy_list(payload) {
  return steepthunderAPI.get(`/modules/privacy-policy/`, {
    params: { page: payload.page }
  })
}
function modules_privacy_policy_retrieve(payload) {
  return steepthunderAPI.get(`/modules/privacy-policy/${payload.id}/`)
}
function modules_terms_and_conditions_list(payload) {
  return steepthunderAPI.get(`/modules/terms-and-conditions/`, {
    params: { page: payload.page }
  })
}
function modules_terms_and_conditions_retrieve(payload) {
  return steepthunderAPI.get(`/modules/terms-and-conditions/${payload.id}/`)
}
function rest_auth_login_create(payload) {
  return steepthunderAPI.post(`/rest-auth/login/`, payload.data)
}
function rest_auth_logout_retrieve(payload) {
  return steepthunderAPI.get(`/rest-auth/logout/`)
}
function rest_auth_logout_create(payload) {
  return steepthunderAPI.post(`/rest-auth/logout/`)
}
function rest_auth_password_change_create(payload) {
  return steepthunderAPI.post(`/rest-auth/password/change/`, payload.data)
}
function rest_auth_password_reset_create(payload) {
  return steepthunderAPI.post(`/rest-auth/password/reset/`, payload.data)
}
function rest_auth_password_reset_confirm_create(payload) {
  return steepthunderAPI.post(
    `/rest-auth/password/reset/confirm/`,
    payload.data
  )
}
function rest_auth_registration_create(payload) {
  return steepthunderAPI.post(`/rest-auth/registration/`, payload.data)
}
function rest_auth_registration_verify_email_create(payload) {
  return steepthunderAPI.post(
    `/rest-auth/registration/verify-email/`,
    payload.data
  )
}
function rest_auth_user_retrieve(payload) {
  return steepthunderAPI.get(`/rest-auth/user/`)
}
function rest_auth_user_update(payload) {
  return steepthunderAPI.put(`/rest-auth/user/`, payload.data)
}
function rest_auth_user_partial_update(payload) {
  return steepthunderAPI.patch(`/rest-auth/user/`, payload.data)
}
export const apiService = {
  api_docs_schema_retrieve,
  api_v1_admin_categories_list,
  api_v1_admin_categories_create,
  api_v1_admin_categories_retrieve,
  api_v1_admin_categories_update,
  api_v1_admin_categories_partial_update,
  api_v1_admin_categories_destroy,
  api_v1_admin_flag_items_list,
  api_v1_admin_flag_items_create,
  api_v1_admin_flag_items_retrieve,
  api_v1_admin_flag_items_update,
  api_v1_admin_flag_items_partial_update,
  api_v1_admin_flag_items_destroy,
  api_v1_admin_products_list,
  api_v1_admin_products_create,
  api_v1_admin_products_retrieve,
  api_v1_admin_products_update,
  api_v1_admin_products_partial_update,
  api_v1_admin_products_destroy,
  api_v1_admin_users_list,
  api_v1_admin_users_create,
  api_v1_admin_users_retrieve,
  api_v1_admin_users_update,
  api_v1_admin_users_partial_update,
  api_v1_admin_users_destroy,
  api_v1_admin_users_add_user_create,
  api_v1_categories_list,
  api_v1_categories_retrieve,
  api_v1_city_retrieve,
  api_v1_confirm_reset_password_create,
  api_v1_feedbacks_list,
  api_v1_feedbacks_create,
  api_v1_feedbacks_retrieve,
  api_v1_feedbacks_update,
  api_v1_feedbacks_partial_update,
  api_v1_feedbacks_destroy,
  api_v1_flag_product_list,
  api_v1_flag_product_create,
  api_v1_flag_product_retrieve,
  api_v1_flag_product_update,
  api_v1_flag_product_partial_update,
  api_v1_flag_product_destroy,
  api_v1_login_create,
  api_v1_products_list,
  api_v1_products_create,
  api_v1_products_retrieve,
  api_v1_products_update,
  api_v1_products_partial_update,
  api_v1_products_destroy,
  api_v1_products_my_products_retrieve,
  api_v1_profile_retrieve,
  api_v1_profile_create,
  api_v1_public_products_list,
  api_v1_public_products_retrieve,
  api_v1_regenerate_otp_create,
  api_v1_reset_password_create,
  api_v1_reviews_list,
  api_v1_reviews_create,
  api_v1_reviews_retrieve,
  api_v1_reviews_update,
  api_v1_reviews_partial_update,
  api_v1_reviews_destroy,
  api_v1_signup_create,
  api_v1_states_retrieve,
  api_v1_validate_otp_create,
  modules_camera_photos_user_list,
  modules_camera_photos_user_retrieve,
  modules_camera_upload_image_create,
  modules_privacy_policy_list,
  modules_privacy_policy_retrieve,
  modules_terms_and_conditions_list,
  modules_terms_and_conditions_retrieve,
  rest_auth_login_create,
  rest_auth_logout_retrieve,
  rest_auth_logout_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_create,
  rest_auth_registration_verify_email_create,
  rest_auth_user_retrieve,
  rest_auth_user_update,
  rest_auth_user_partial_update
}
