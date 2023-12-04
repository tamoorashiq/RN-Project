import React from "react"
import { DialogContent, Grid, TextField, Typography } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import RadioInput from "../Inputs/RadioInput"

const BanUser = ({ onClose }) => {
  return (
    <div style={{ maxWidth: 300 }}>
      <Header title={"Ban User"} />

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <RadioInput
            title="From"
            options={[
              {
                value: "posting",
                label: "Posting"
              },
              {
                value: "from the app",
                label: "From the app"
              }
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <RadioInput
            title="Duration"
            options={[
              {
                value: "3",
                label: "3 months"
              },
              {
                value: "6",
                label: "6 months"
              }
            ]}
          />
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
                sx={{ borderRadius: 40, px: 2.5, py: 1 }}
                text={"Confirm"}
                noIcon
                disableElevation
                onClick={onClose}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default BanUser
