import React, { useState } from "react"
import { DialogContent, Grid, TextField } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import { useSelector, useDispatch } from "react-redux"
import { ADD_CATEGORIES } from "../../Redux/types"
import useFetch from "../../Utils/useFetch"
import { toast } from "react-toastify"
import { ADD_CATEGORY_API } from "../../Constant"
const AddCategory = ({ onClose, getData }) => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  let categories = useSelector(state => state.categoryReducer?.categories)
  const addCategory = async () => {
    try {
      setLoading(true)
      const req = await request(ADD_CATEGORY_API, "POST", {
        name
      })
      console.log(req)
      if (req.status === 200) {
        toast.success("New Category Added Successfully!")
        onClose()
        getData()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <>
      <Header title={"Add Category"} />

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={e => setName(e.target.value)}
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
                onClick={addCategory}
                disabled={loading}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AddCategory
