import * as React from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined"

export default function IconButton({
  text,
  startIcon = <GroupAddOutlinedIcon />,
  noIcon,
  ...props
}) {
  const sizeStyle = props.size === "large" ? { height: 55, width: 120 } : {}
  return (
    <Button
      variant="contained"
      startIcon={noIcon ? null : startIcon}
      sx={{ borderRadius: 10, ...sizeStyle }}
      {...props}
    >
      {text}
    </Button>
  )
}
