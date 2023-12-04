import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"

export const getProducts = createAsyncThunk("products/all", async payload => {
  try {
    const response = await apiService.getAllProducts()
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(
      JSON.stringify(error) || "An error occurred during getAllProducts."
    )
  }
})

export const getPublicProducts = createAsyncThunk(
  "products/public",
  async payload => {
    try {
      const response = await apiService.getPublicProducts()
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during getAllProducts."
      )
    }
  }
)

export const addMyProduct = createAsyncThunk("products/add", async payload => {
  try {
    const response = await apiService.addNewProduct(payload)
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(
      JSON.stringify(error) || "An error occurred during addMyProduct."
    )
  }
})

export const updateMyProduct = createAsyncThunk(
  "products/update",
  async payload => {
    try {
      const response = await apiService.updateProduct(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during addMyProduct."
      )
    }
  }
)

export const getMyProducts = createAsyncThunk("products/my", async payload => {
  try {
    const response = await apiService.getMyProducts()
    return response
  } catch (error) {
    // Throw an error with a custom message if available, otherwise use the default error message
    throw new Error(
      JSON.stringify(error) || "An error occurred during getAllProducts."
    )
  }
})

export const getProductsByFilters = createAsyncThunk(
  "products/allFilters",
  async payload => {
    try {
      const response = await apiService.getAllProductsWithFilters(payload)
      return response
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during getAllProducts."
      )
    }
  }
)

export const getAllCategories = createAsyncThunk(
  "categories/all",
  async payload => {
    try {
      const response = await apiService.getAllCategories()
      console.log("response is ", response)
      let categories = response.results
      if (response.next) {
        const response2 = await apiService.getAllCategories(2)
        categories = [...categories, ...response2.results]
      }
      return categories
    } catch (error) {
      // Throw an error with a custom message if available, otherwise use the default error message
      throw new Error(
        JSON.stringify(error) || "An error occurred during getAllProducts."
      )
    }
  }
)

const initialState = {
  products: [],
  publicProducts: [],
  myProducts: [],
  categories: [],
  api: { loading: "idle", error: null },
  categoriesApi: { loading: "idle", error: null },
  addProductApi: { loading: "idle", error: null }
}

// Creating the slice for the model Pet
const products = createSlice({
  name: "appProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getProducts.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        state.products = action.payload
        state.api.loading = "idle"
      }
    },
    [getProducts.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [getPublicProducts.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getPublicProducts.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        state.publicProducts = action.payload
        state.api.loading = "idle"
      }
    },
    [getPublicProducts.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [getMyProducts.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getMyProducts.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        state.myProducts = action.payload
        state.api.loading = "idle"
      }
    },
    [getMyProducts.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [getAllCategories.pending]: (state, action) => {
      if (state.categoriesApi.loading === "idle") {
        state.categoriesApi.loading = "pending"
      }
    },
    [getAllCategories.fulfilled]: (state, action) => {
      if (state.categoriesApi.loading === "pending") {
        // update Pets array with new pet list data
        state.categories = action.payload
        state.categoriesApi.loading = "idle"
      }
    },
    [getAllCategories.rejected]: (state, action) => {
      if (state.categoriesApi.loading === "pending") {
        state.categoriesApi.error = action.error
        state.categoriesApi.loading = "idle"
      }
    },

    [getProductsByFilters.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [getProductsByFilters.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        // update Pets array with new pet list data
        state.products = action.payload
        state.api.loading = "idle"
      }
    },
    [getProductsByFilters.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },

    [addMyProduct.pending]: (state, action) => {
      if (state.addProductApi.loading === "idle") {
        state.addProductApi.loading = "pending"
      }
    },
    [addMyProduct.fulfilled]: (state, action) => {
      if (state.addProductApi.loading === "pending") {
        // update Pets array with new pet list data
        state.addProductApi.loading = "idle"
      }
    },
    [addMyProduct.rejected]: (state, action) => {
      if (state.addProductApi.loading === "pending") {
        state.addProductApi.error = action.error
        state.addProductApi.loading = "idle"
      }
    },

    [updateMyProduct.pending]: (state, action) => {
      if (state.addProductApi.loading === "idle") {
        state.addProductApi.loading = "pending"
      }
    },
    [updateMyProduct.fulfilled]: (state, action) => {
      if (state.addProductApi.loading === "pending") {
        // update Pets array with new pet list data
        state.addProductApi.loading = "idle"
      }
    },
    [updateMyProduct.rejected]: (state, action) => {
      if (state.addProductApi.loading === "pending") {
        state.addProductApi.error = action.error
        state.addProductApi.loading = "idle"
      }
    }
  }
})
export default {
  getProducts,
  getAllCategories,
  getProductsByFilters,
  slice: products
}
