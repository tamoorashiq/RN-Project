import { Box, Typography, IconButton as IconBtn, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import IconButton from "../../Components/Buttons/IconButton"
import SearchBar from "../../Components/Inputs/SearchBar"
import { useDispatch, useSelector } from "react-redux"

import StickyHeadTable from "../../Components/Table/Table.jsx"
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import SimpleDialog from "../../Components/Dialog/SimpleDialog"

import DeleteCategory from "../../Components/DialogContent/DeleteCategory"
import EditCategory from "../../Components/DialogContent/EditCategory"
import AddCategory from "../../Components/DialogContent/AddCategory"
import useFetch from "../../Utils/useFetch"
import { GET_ALL_CATEGORIES_API } from "../../Constant"
import { ADD_CATEGORIES } from "../../Redux/types"
import qs from "qs"
const Categories = () => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [categoriesData, setCategoriesData] = useState([])

  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [open, setOpen] = useState(false)
  let categories = useSelector(state => state.categoryReducer?.categories)

  const columns = [
    { id: "serialNum", label: "S.N", minWidth: 10, width: 35 },
    {
      id: "name",
      label: "Categories",
      minWidth: 170
    },
    {
      id: "options",
      label: "Options",
      minWidth: 10,
      align: "center",
      format: value => value.toLocaleString("en-US"),
      width: 150
    }
  ]

  const handleClose = value => {
    setOpen(false)
  }
  const handleClick = (condition, id) => {
    setSelectedId(id)
    setOpen(condition)
  }
  const getDialogContent = type => {
    switch (type) {
      case "delete":
        return <DeleteCategory onClose={handleClose} categoryId={selectedId} />
      case "edit":
        return (
          <EditCategory title onClose={handleClose} categoryId={selectedId} />
        )
      case "add":
        return (
          <AddCategory
            title="Add User"
            onClose={handleClose}
            userId={selectedId}
            getData={getCategories}
          />
        )
    }
  }

  useEffect(() => {
    console.log(categoriesData, "CATEGORIES CHECKING FIELD")
    handleData()
  }, [categories?.results?.length, open])

  const handleData = data => {
    if (data?.results?.length || categories?.results?.length) {
      setCategoriesData([
        ...(data?.results || categories?.results)?.map((v, i) => {
          return {
            serialNum: i + 1,
            name: v.name || "-",
            options: (
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconBtn
                  aria-label="edit"
                  sx={{ backgroundColor: Theme.bg.orange }}
                  disableElevation
                  disableRipple
                  onClick={e => handleClick("edit", v.id)}
                >
                  <ModeEditOutlinedIcon style={{ color: Theme.color.txt2 }} />
                </IconBtn>
                <IconBtn
                  aria-label="delete"
                  sx={{ backgroundColor: Theme.bg.maroon }}
                  disableElevation
                  disableRipple
                  onClick={e => handleClick("delete", v.id)}
                >
                  <DeleteOutlineIcon style={{ color: Theme.color.txt2 }} />
                </IconBtn>
              </Stack>
            )
          }
        })
      ])
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(
        api || GET_ALL_CATEGORIES_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_CATEGORIES,
          payload: api
            ? {
                ...res.data,
                results: [...categories.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
        handleData()
      } else {
        console.log(res, "error-categories")
      }
      setLoading(false)
      return true
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{ backgroundColor: Theme.bg.bgColor, px: 6, pt: 4, height: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: 500 }}>
          Manage Categories
        </Typography>
        <IconButton
          // borderRadius={"20px"}
          sx={{ borderRadius: 40, px: 2.5, py: 1 }}
          // startIcon={<AddCircleIcon />}
          text={"Add Categories"}
          onClick={() => handleClick("add")}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pt: 2
        }}
      >
        <SearchBar
          placeholder="Search"
          borderRadius={"28px"}
          minWidth={400}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSubmit={getCategories}
        />
      </Box>
      <Box sx={{ pt: 2 }}>
        {/* <Table data={data} columns={columns} /> */}
        <StickyHeadTable
          columns={columns}
          rows={categoriesData}
          count={categories?.count || 0}
          next={
            categories?.next
              ? callback => getCategories(categories?.next, callback)
              : null
          }
          previous={
            categories?.previous
              ? callback => getCategories(categories?.previous, callback)
              : null
          }
          loading={loading}
        />
      </Box>
      <SimpleDialog
        component={getDialogContent(open)}
        open={Boolean(open)}
        title="Add Category"
        onClose={handleClose}
      />
    </Box>
  )
}

export default Categories
