import React, { useState } from "react"
import { DialogContent, Grid, TextField } from "@mui/material"
import IconButton from "../Buttons/IconButton"
import { Theme } from "../../Theme"
import Header from "./Header"
import { EDIT_CATEGORY_API } from "../../Constant"
import { useSelector, useDispatch } from "react-redux"
import { ADD_CATEGORIES } from "../../Redux/types"
import useFetch from "../../Utils/useFetch"
import { toast } from "react-toastify"
const EditCategory = ({ onClose, categoryId, getData }) => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  let categories = useSelector(state => state.categoryReducer?.categories)
  let categoryData = useSelector(state =>
    state.categoryReducer?.categories?.results?.find(v => v.id === categoryId)
  )
  const [name, setName] = useState(categoryData?.name || "")
  console.log(categoryId, "categoryId")
  const editCategory = async () => {
    try {
      setLoading(true)
      const req = await request(
        EDIT_CATEGORY_API.replace(":id", categoryId),
        "PUT",
        {
          name
        }
      )
      console.log(req)
      if (req.status === 200) {
        toast.success("Category Edited Successfully!")
        const catObj = { ...categories }

        const index = catObj.results.findIndex(v => v.id === categoryId)
        console.log(index)
        catObj.results[index].name = name

        dispatch({
          type: ADD_CATEGORIES,
          payload: catObj
        })
        onClose()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <Header title={"Edit Category"} />

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
                onClick={editCategory}
                loading={loading}
                disabled={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default EditCategory
