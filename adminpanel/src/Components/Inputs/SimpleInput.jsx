import React from "react"

import { TextField } from "@mui/material"
import { Theme } from "../../Theme"

const SimpleInput = ({ ...props }) => {
  return (
    <TextField
      variant="outlined"
      sx={{
        bgcolor: Theme.bg.dialogBg,
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
          borderColor: Theme.borderColor.lightBorder
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
          borderColor: Theme.borderColor.lightBorder
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
          borderColor: Theme.borderColor.lightBorder
        }
      }}
      {...props}
    />
  )
}

export default SimpleInput
