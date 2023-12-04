import React, { useState } from "react"
import { DialogContent, Grid, TextField, Typography } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { useSelector, useDispatch } from "react-redux"
import { DELETE_USER_API, PUT_USER_API } from "../../Constant"
import { ADD_USERS } from "../../Redux/types"
import useFetch from "../../Utils/useFetch"
import { toast } from "react-toastify"

const DeleteUser = ({ onClose, userId }) => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  let users = useSelector(state => state.AllUserReducer?.users)
  let userData = useSelector(state =>
    state.AllUserReducer?.users?.results?.find(v => v.id === userId)
  )
  console.log(userId, "userId")
  const deleteUser = async () => {
    try {
      setLoading(true)
      const req = await request(
        DELETE_USER_API.replace(":id", userId),
        "DELETE",
        {
          is_active: false
        }
      )
      console.log(req)
      // if (req.status === 200) {
      toast.success("User Deleted Successfully!")
      const usersObj = { ...users }

      usersObj.results = usersObj.results.filter(v => v.id !== userId)
      dispatch({
        type: ADD_USERS,
        payload: usersObj
      })
      onClose()
      // }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <div style={{ maxWidth: 300 }}>
      <Header title={"Delete User"} align="left" />

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <Typography variant="p">
            This process is irreversible. Are you sure you want to delete user
            {userData?.name ? `"${userData?.name}"` : ""}?
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
                onClick={deleteUser}
                startIcon={<DeleteOutlineIcon />}
                color="error"
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

export default DeleteUser
