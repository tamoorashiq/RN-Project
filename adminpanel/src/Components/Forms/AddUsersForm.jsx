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
import { ADD_USERS } from "../../Redux/types"
import { useDispatch } from "react-redux"

const AddUsersForm = props => {
  const { onClose, selectedValue, open, title } = props
  const { request } = useFetch()
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
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
        fullName,
        phoneNumber,
        address,
        state,
        city,
        zip
      }
      const errors = {}
      if (!reqBody?.fullName) {
        errors.fullName = ["fullName field may not be blank."]
      }
      if (!reqBody?.phoneNumber) {
        errors.phoneNumber = ["phoneNumber field may not be blank."]
      }
      if (!reqBody?.address) {
        errors.address = ["address field may not be blank."]
      }
      if (!reqBody?.state) {
        errors.state = ["state field may not be blank."]
      }
      if (!reqBody?.city) {
        errors.city = ["city field may not be blank."]
      }
      if (!reqBody?.zip) {
        errors.zip = ["zip field may not be blank."]
      }
      console.log(errors)

      if (Object.keys(errors).length) {
        setErrorObj(errors)
        return
      }
      setErrorObj({})
      setLoading(true)
      //   const req = await request(LOGIN_API, "POST", reqBody)
      toast.success("Operation successful!")
      // dispatch({
      //     type: ADD_USERS,
      //     payload: req?.data
      //   })
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
            error={Boolean(errorObj?.fullName)}
            helperText={errorObj?.fullName?.[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Phone Number"
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            fullWidth
            error={Boolean(errorObj?.phoneNumber)}
            helperText={errorObj?.phoneNumber?.[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Street Address"
            onChange={e => setAddress(e.target.value)}
            value={address}
            fullWidth
            error={Boolean(errorObj?.address)}
            helperText={errorObj?.address?.[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleSelect
            // placeholder={"Status"}
            style={{
              // backgroundColor: Theme.color.textField,
              minWidth: 350
            }}
            fullWidth
            placeholder={"State"}
            value={state}
            onChange={setState}
            options={stateName}
            error={Boolean(errorObj?.state)}
            helperText={errorObj?.state?.[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleSelect
            // placeholder={"Status"}
            style={{
              // backgroundColor: Theme.color.textField,
              minWidth: 350
            }}
            fullWidth
            placeholder={"City"}
            value={city}
            onChange={setCity}
            options={cityName}
            error={Boolean(errorObj?.city)}
            helperText={errorObj?.city?.[0]}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleInput
            label="Zip"
            onChange={e => setZip(e.target.value)}
            value={zip}
            fullWidth
            error={Boolean(errorObj?.zip)}
            helperText={errorObj?.zip?.[0]}
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

export default AddUsersForm
