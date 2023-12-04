import { DialogTitle } from "@mui/material"
import React from "react"

const DeleteContent = ({ title }) => {
  return (
    <div>
      <DialogTitle
        sx={{ textAlign: "left", paddingX: 0 }}
      >{`Delete ${title}`}</DialogTitle>
    </div>
  )
}

export default DeleteContent
