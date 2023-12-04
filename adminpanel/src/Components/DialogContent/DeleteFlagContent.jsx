import React from "react"
import { DialogContent, Grid, TextField, Typography } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

const DeleteFlagContent = ({ onClose }) => {
  return (
    <div style={{ maxWidth: 300 }}>
      <Header title={"Delete Content"} align="left" />

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <Typography variant="p">
            This process is irreversible. Are you sure you want to delete this
            content?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent={"flex-end"}>
            <Grid item>
              <IconButton
                sx={{
                  borderRadius: 40,
                  px: 2.5,
                  py: 1,
                  borderColor: Theme.bg.dialogBg
                }}
                variant="outlined"
                text={"Cancel"}
                noIcon
                disableElevation
                onClick={onClose}
              />
            </Grid>
            <Grid item>
              <IconButton
                text={"Delete"}
                disableElevation
                onClick={onClose}
                startIcon={<DeleteOutlineIcon />}
                color="error"
                sx={{
                  borderRadius: 40,
                  px: 2.5,
                  py: 1,
                  borderColor: Theme.bg.dialogBg
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeleteFlagContent
