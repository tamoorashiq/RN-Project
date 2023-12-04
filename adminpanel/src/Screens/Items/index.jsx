import {
  Box,
  Typography,
  IconButton as IconBtn,
  Stack,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Paper
} from "@mui/material"
import React, { useEffect, useState, useRef } from "react"
import { Theme } from "../../Theme"
import STATES_DATA from "./../../Assets/Data/State.json"
import CITIES_DATA from "./../../Assets/Data/City.json"
import IconButton from "../../Components/Buttons/IconButton"
import ItemCard from "../../Components/Cards/ItemCard"
import qs from "qs"
import useFetch from "../../Utils/useFetch"
import { useSelector, useDispatch } from "react-redux"
import {
  GET_ALL_CATEGORIES_API,
  GET_CITIES_API,
  GET_MANAGE_ITEMS_API,
  GET_STATES_API
} from "../../Constant"
import {
  ADD_ALL_CATEGORIES,
  ADD_CITIES,
  ADD_ITEMS,
  ADD_STATES
} from "../../Redux/types"
import { IconButton as IcoBtn } from "@mui/joy/IconButton/IconButton"
import TablePagination from "../../Components/Table/TablePagination"
const Items = () => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const stateRef = useRef(null)
  const cityRef = useRef(null)
  const categoryRef = useRef(null)

  const items = useSelector(state => state.itemReducer.items)
  const allCategories = useSelector(state => state.itemReducer.allCategories)
  const states = useSelector(state => state.itemReducer.states)
  const cities = useSelector(state => state.itemReducer.cities)
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingScroll, setLoadingScroll] = useState(false)
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")
  const getItems = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)
      setLoadingScroll(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      if (city) {
        searchObj.city = city
      }
      if (state) {
        searchObj.state = state
      }
      if (category) {
        searchObj.category = category
      }
      const res = await request(
        api || GET_MANAGE_ITEMS_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_ITEMS,
          payload: api
            ? {
                ...res.data,
                results: [...items.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
        console.log(
          res.data.next,
          [...res.data.results, ...items.results].filter(
            (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
          ).length,
          "DISPATCH_DISPATCH",
          api
        )
      } else {
        console.log(res, "error-categories")
      }
      setLoading(false)
      return true
    } catch (e) {
      console.log(e)
      setLoading(false)
    } finally {
      setLoadingScroll(false)
    }
  }

  useEffect(() => {
    getItems()
    getCategories()
    getStates()
  }, [])

  useEffect(() => {
    if (state) {
      getCities()
    }
  }, [state])
  const getCategories = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(
        api || GET_ALL_CATEGORIES_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_ALL_CATEGORIES,
          payload: api
            ? {
                ...res.data,
                results: [...allCategories.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
      } else {
        console.log(res, "error-categories")
      }
      setLoading(false)
      return true
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  const getCities = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(api || GET_CITIES_API?.replace(":state", state))
      if (res.status === 200) {
        dispatch({
          type: ADD_CITIES,
          payload: res?.data
        })
      } else {
        console.log(res, "error-categories")
      }
      setLoading(false)
      return true
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  const getStates = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(
        api || GET_STATES_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_STATES,
          payload: res?.data
        })
      } else {
        console.log(res, "error-categories")
      }
      setLoading(false)
      return true
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollHeight - scrollTop === clientHeight && !loadingScroll) {
      if (items.next) {
        getItems(items?.next)
      }
    }
  }
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [loadingScroll])

  console.log("DISPATCH_DISPATCH", items?.next, items?.results?.length)
  return (
    <Box
      sx={{ backgroundColor: Theme.bg.bgColor, px: 6, pt: 4, height: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: 500 }}>
          Manage Items
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pt: 2
        }}
      >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                action={stateRef}
                labelId="state-label"
                id="select-state"
                value={state}
                label="State"
                onChange={e => setState(e.target.value)}
                style={{ borderRadius: 10 }}
              >
                {states?.map(v => {
                  return (
                    <MenuItem value={v.id} key={v}>
                      {v.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="select-city"
                value={city}
                label="City"
                onChange={e => setCity(e.target.value)}
                style={{ borderRadius: 10 }}
              >
                {cities?.map(c => {
                  return (
                    <MenuItem value={c.id} key={c.id}>
                      {c.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="select-category"
                value={category}
                label="Category"
                onChange={e => setCategory(e.target.value)}
                style={{ borderRadius: 10 }}
              >
                {allCategories?.results?.map(c => {
                  return (
                    <MenuItem value={c.id} key={c.id}>
                      {c.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={2}>
            <IconButton
              noIcon
              text="Apply"
              size="large"
              onClick={() => getItems()}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ pt: 2, mb: 1 }}>
        <Paper sx={{ p: 1 }}>
          {items?.results?.map((v, i) => {
            return <ItemCard key={i} data={v} />
          })}
          <TablePagination
            setPage={() => {}}
            data={items?.results || []}
            count={items?.count || 0}
            next={
              items?.next ? callback => getItems(items?.next, callback) : null
            }
            previous={
              items?.previous
                ? callback => getItems(items?.previous, callback)
                : null
            }
            loading={loading}
            loadMore
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default Items
