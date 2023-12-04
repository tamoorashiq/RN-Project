import { DialogTitle } from "@mui/material"
import React from "react"

const Header = ({ title, align, fontSize }) => {
  return (
    <div>
      <DialogTitle
        sx={{
          textAlign: "left",
          paddingX: 0,
          paddingY: 0,
          textAlign: align || "center",
          fontSize
        }}
      >
        {title}
      </DialogTitle>
    </div>
  )
}

export default Header
