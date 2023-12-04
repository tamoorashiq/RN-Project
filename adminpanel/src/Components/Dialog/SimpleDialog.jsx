import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import { Box, DialogContent, Grid } from "@mui/material"
import SimpleInput from "../Inputs/SimpleInput"
import SimpleButton from "../Buttons/SimpleButton"
import useFetch from "../../Utils/useFetch"
import { LoadingButton } from "@mui/lab"
import SimpleSelect from "../Inputs/SimpleSelect"
import AddUsersForm from "../Forms/AddUsersForm"
import { Theme } from "../../Theme"
import Header from "../DialogContent/Header"

const SimpleDialog = props => {
  const { onClose, selectedValue, open, component, title } = props
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
  // console.log(open, anchorEl, "pen,anchorEl")

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  return (
    <Dialog
      // onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          // width: "20%",
          maxHeight: 900,
          paddingX: 2,
          paddingY: 2,
          backgroundColor: Theme.bg.dialogBg,
          borderRadius: "28px"
        }
      }}
    >
      <DialogContent sx={{ p: 1 }}>{component}</DialogContent>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}

export default SimpleDialog
