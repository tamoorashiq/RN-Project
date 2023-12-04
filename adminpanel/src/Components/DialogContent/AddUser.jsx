import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import { Box, Grid } from "@mui/material"
import SimpleInput from "../Inputs/SimpleInput"
import SimpleButton from "../Buttons/SimpleButton"
import useFetch from "../../Utils/useFetch"
import { LoadingButton } from "@mui/lab"
import SimpleSelect from "../Inputs/SimpleSelect"
import { toast } from "react-toastify"
import { ADD_CITIES, ADD_STATES, ADD_USERS } from "../../Redux/types"
import { useDispatch, useSelector } from "react-redux"
import { ADD_USER_API, GET_CITIES_API, GET_STATES_API } from "../../Constant"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import qs from "qs"
const AddUser = props => {
  const items = useSelector(state => state.itemReducer.items)
  const allCategories = useSelector(state => state.itemReducer.allCategories)
  const states = useSelector(state => state.itemReducer.states)
  const cities = useSelector(state => state.itemReducer.cities)
  const { onClose, selectedValue, open, title } = props
  const { request } = useFetch()
  const [fullName, setFullName] = useState("")
  const [searchText, setSearchText] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorObj, setErrorObj] = useState({})
  const [propertySidebar, setPropertySidebar] = useState(false)
  const dispatch = useDispatch()

  let stateName = ["New York", "Texas", "Indiana"]
  let cityName = [
    "New York",
    "Buffalo",
    "Rochester",
    "Yonkers",
    "Syracuse",
    "Albany"
  ]

  const handleSubmit = async () => {
    try {
      let reqBody = {
        full_name: fullName,
        phone_number: phoneNumber,
        address,
        state,
        city,
        zip,
        email,
        password
      }
      const errors = {}
      if (!reqBody?.full_name) {
        errors.full_name = "fullName field may not be blank."
      }
      if (!reqBody?.email) {
        errors.email = "email field may not be blank."
      }
      if (!reqBody?.phone_number) {
        errors.phone_number = "phoneNumber field may not be blank."
      }
      if (!reqBody?.address) {
        errors.address = "address field may not be blank."
      }
      if (!reqBody?.state) {
        errors.state = "state field may not be blank."
      }
      if (!reqBody?.city) {
        errors.city = "city field may not be blank."
      }
      if (!reqBody?.zip) {
        errors.zip = "zip field may not be blank."
      }
      if (!reqBody?.password) {
        errors.password = "Password field may not be blank."
      }
      console.log(errors)

      if (Object.keys(errors).length) {
        setErrorObj(errors)
        return
      }
      setErrorObj({})
      setLoading(true)
      const req = await request(ADD_USER_API, "POST", reqBody)
      toast.success("New User Added successful!")
      dispatch({
        type: ADD_USERS,
        payload: req?.data
      })
      onClose()
    } catch (err) {
      setLoading(false)
      if (err.error?.["non_field_errors"]) {
        // addToast(err.error?.["non_field_errors"][0], {
        //   appearance: "error",
        //   autoDismiss: true
        // })
        toast.error(err.error?.["non_field_errors"][0])
      }
      setErrorObj(err.error)
    }
  }
  useEffect(() => {
    if (state) {
      getCities()
    }
  }, [state])
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
  return (
    <Box sx={{}}>
      <DialogTitle sx={{ textAlign: "left", paddingX: 0 }}>{title}</DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SimpleInput
            label="Full Name"
            onChange={e => setFullName(e.target.value)}
            value={fullName}
            fullWidth
            error={Boolean(errorObj?.full_name)}
            helperText={errorObj?.full_name}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            fullWidth
            error={Boolean(errorObj?.email)}
            helperText={errorObj?.email}
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Phone Number"
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            fullWidth
            error={Boolean(errorObj?.phone_number)}
            helperText={errorObj?.phone_number}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Street Address"
            onChange={e => setAddress(e.target.value)}
            value={address}
            fullWidth
            error={Boolean(errorObj?.address)}
            helperText={errorObj?.address}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <SimpleInput
            label="Zip"
            onChange={e => setZip(e.target.value)}
            value={zip}
            fullWidth
            error={Boolean(errorObj?.zip)}
            helperText={errorObj?.zip}
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            fullWidth
            error={Boolean(errorObj?.password)}
            helperText={errorObj?.password}
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 0.1 }} justifyContent="flex-end">
        <Grid item xs={4}>
          <LoadingButton
            loading={loading}
            // variant="outlined"
            fullWidth
            size="medium"
            // style={{ borderRadius: '100px' }}
            onClick={onClose}
          >
            Cancel
          </LoadingButton>
        </Grid>
        <Grid item xs={4}>
          <LoadingButton
            loading={loading}
            variant="contained"
            fullWidth
            size="medium"
            style={{ borderRadius: "100px" }}
            onClick={handleSubmit}
          >
            Add User
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddUser
