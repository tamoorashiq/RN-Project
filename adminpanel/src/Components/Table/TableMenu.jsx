import React, { useState } from "react"
import { makeStyles } from "@mui/styles"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem
} from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Theme } from "../../Theme"

const ITEM_HEIGHT = 48

function TableMenu({
  handleClose,
  handleOptionClick = () => {},
  open,
  anchorEl,
  selectedId,
  options
}) {
  return (
    <div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: Theme.bg.dialogBg
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.name}
            onClick={() => handleOptionClick(option.name, selectedId)}
            style={{ padding: 15 }}
          >
            {/* {option === "Deactivate" ? <RemoveCircleOutlineIcon /> : <DeleteIcon />} */}
            {Boolean(option.icon) && option.icon}
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default TableMenu
