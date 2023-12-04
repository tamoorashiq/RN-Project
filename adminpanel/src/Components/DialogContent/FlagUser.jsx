import React, { useState } from "react"
import { DialogContent, Grid, TextField, Typography } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags"
import useFetch from "../../Utils/useFetch"
import { PUT_USER_API } from "../../Constant"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { ADD_USERS } from "../../Redux/types"

const FlagUser = ({ onClose, userId, onSubmit }) => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  let users = useSelector(state => state.AllUserReducer?.users)
  console.log(userId, "userId")
  const flagUser = async () => {
    try {
      setLoading(true)
      const req = await request(PUT_USER_API.replace(":id", userId), "PUT", {
        is_active: false
      })
      console.log(req)
      if (req.status === 200) {
        toast.success("User Flagged Successfully!")
        onClose()
        const usersObj = { ...users }

        const index = usersObj.results.findIndex(v => v.id === userId)
        console.log(index)
        usersObj.results[index].is_active = false

        dispatch({
          type: ADD_USERS,
          payload: usersObj
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <div style={{ maxWidth: 300, minWidth: 300 }}>
      <Grid container spacing={2} sx={{ my: 0 }}>
        <Grid item xs={12} align="center">
          <EmojiFlagsIcon style={{ fontSize: 48 }} />
        </Grid>
        <Grid item xs={12}>
          <Header title={"Flag this user"} align="center" fontSize={28} />
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
                text={"Ok"}
                noIcon
                disableElevation
                onClick={flagUser}
                sx={{
                  borderRadius: 40,
                  px: 2.5,
                  py: 1,
                  borderColor: Theme.bg.dialogBg
                }}
                variant="outlined"
                disabled={loading}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default FlagUser
