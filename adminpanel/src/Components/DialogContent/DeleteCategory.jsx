import React, { useState } from "react"
import { DialogContent, Grid, TextField, Typography } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { DELETE_CATEGORY_API } from "../../Constant"
import { useSelector, useDispatch } from "react-redux"
import { ADD_CATEGORIES } from "../../Redux/types"
import useFetch from "../../Utils/useFetch"
import { toast } from "react-toastify"
const DeleteCategory = ({ onClose, categoryId }) => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  let categories = useSelector(state => state.categoryReducer?.categories)
  let categoryData = useSelector(state =>
    state.categoryReducer?.categories?.results?.find(v => v.id === categoryId)
  )
  console.log(categoryId, "categoryId")
  const deleteCategory = async () => {
    try {
      setLoading(true)
      const req = await request(
        DELETE_CATEGORY_API.replace(":id", categoryId),
        "DELETE",
        {
          is_active: false
        }
      )
      console.log(req)
      // if (req.status === 200) {
      toast.success("Category Deleted Successfully!")
      const catObj = { ...categories }

      catObj.results = catObj.results.filter(v => v.id !== categoryId)
      dispatch({
        type: ADD_CATEGORIES,
        payload: catObj
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
      <Header title={"Delete Electronics"} align="left" />

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <Typography variant="p">
            This process is irreversible. Are you sure you want to delete
            category “{categoryData?.name || "-"}”?
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
                onClick={deleteCategory}
                startIcon={<DeleteOutlineIcon />}
                color="error"
                sx={{
                  borderRadius: 40,
                  px: 2.5,
                  py: 1,
                  borderColor: Theme.bg.dialogBg
                }}
                variant="outlined"
                loading={loading}
                disabled={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeleteCategory
