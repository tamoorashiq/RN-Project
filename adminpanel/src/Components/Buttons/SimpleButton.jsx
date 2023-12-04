import * as React from "react"
import Button from "@mui/material/Button"
import { LoadingButton } from "@mui/lab"
import { Theme } from "../../Theme"

const SimpleButton = ({ text = "Add User", variant = "contained",loading }) => {
  return (
    <LoadingButton
      loading
      variant={variant}
      disableElevation
      sx={{backgroundColor:Theme.bg.bgColor}}
    >
      {text}
    </LoadingButton>
  )
}
export default SimpleButton
