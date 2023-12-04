import { Box, Typography, IconButton as IconBtn, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import IconButton from "../../Components/Buttons/IconButton"
import SearchBar from "../../Components/Inputs/SearchBar"
import Table from "../../Components/Table/TableComponent"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import AVATAR_IMG from "../../Assets/Images/avatar.png"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import StickyHeadTable from "../../Components/Table/Table.jsx"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import SimpleDialog from "../../Components/Dialog/SimpleDialog"
import FlagContent from "../../Components/DialogContent/FlagContent"
import DeleteContent from "../../Components/DialogContent/DeleteContent"
import AddUsersForm from "../../Components/Forms/AddUsersForm"
import useFetch from "../../Utils/useFetch"
import { GET_ALL_USERS_API } from "../../Constant"
import { ADD_USERS } from "../../Redux/types"
import qs from "qs"
import FlagUser from "../../Components/DialogContent/FlagUser"
import DeleteUser from "../../Components/DialogContent/DeleteUser"
import AddUser from "../../Components/DialogContent/AddUser"
const columns = [
  { id: "serialNum", label: "S.N", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "left",
    format: value => value.toLocaleString("en-US")
  },
  {
    id: "options",
    label: "Options",
    minWidth: 10,
    align: "center",
    format: value => value.toLocaleString("en-US")
  }
]
const Dashboard = () => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [userData, setUserData] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  let users = useSelector(state => state.AllUserReducer?.users)

  const NameComponent = ({ id, name }) => {
    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <img src={AVATAR_IMG} alt="" />
        <Link
          // to={`/technician/${id}`}
          style={{ textDecoration: "none", color: Theme.color.text }}
        >
          {name}
        </Link>
      </Box>
    )
  }

  const handleClickOpen = () => {
    setOpen("add")
  }
  const handleClose = value => {
    setOpen(false)
  }
  const handleClick = (condition, id) => {
    setSelectedId(id)
    setOpen(condition)
  }
  const getDialogContent = cond => {
    switch (cond) {
      case "delete":
        return (
          <DeleteUser
            onClose={() => setOpen(false)}
            userId={selectedId}
            onSubmit={getUsers}
          />
        )
      case "flag":
        return (
          <FlagUser
            onClose={() => setOpen(false)}
            userId={selectedId}
            onSubmit={getUsers}
          />
        )
      case "add":
        return <AddUser onClose={() => setOpen(false)} userId={selectedId} />
    }
  }

  useEffect(() => {
    handleData()
  }, [users?.results?.length, open])

  const handleData = data => {
    if (data?.results?.length || users?.results?.length) {
      setUserData([
        ...(data?.results || users?.results)?.map((v, i) => {
          console.log(v, "USERDATE")
          return {
            serialNum: i + 1,
            name: <NameComponent id={v.id} name={v.email || "-"} />,
            phone: v.phone_number || "-",
            address: v.street_address || "-",
            options: (
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconBtn
                  aria-label="flag"
                  sx={{
                    backgroundColor: v.is_active
                      ? Theme.bg.orange
                      : Theme.bg.lightGrey
                  }}
                  disableElevation
                  disableRipple
                  onClick={e =>
                    v.is_active ? handleClick("flag", v.id) : null
                  }
                  // disabled={!v.is_active}
                >
                  <OutlinedFlagIcon style={{ color: Theme.color.txt2 }} />
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
                <IconBtn
                  aria-label="delete"
                  sx={{ backgroundColor: Theme.bg.grey }}
                  disableElevation
                  disableRipple
                >
                  <BlockOutlinedIcon style={{ color: Theme.color.txt2 }} />
                </IconBtn>
              </Stack>
            )
          }
        })
      ])
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (api = null) => {
    try {
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      console.log(api, api || GET_ALL_USERS_API + "?" + qs.stringify(searchObj))

      const res = await request(
        api || GET_ALL_USERS_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_USERS,
          payload: api
            ? {
                ...res.data,
                results: [...users.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
        if (!res?.data?.results?.length) {
          setUserData([])
        }

        handleData()
        console.log({
          ...res.data,
          results: [...res.data.results, ...users.results].filter(
            (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
          )
        })
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
          All Users
        </Typography>
        <IconButton
          // borderRadius={"20px"}
          sx={{ borderRadius: 40, px: 2.5, py: 1 }}
          // startIcon={<AddCircleIcon />}
          text={"Add User"}
          onClick={handleClickOpen}
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
          placeholder="Search Services"
          borderRadius={"28px"}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSubmit={getUsers}
        />
      </Box>
      <Box sx={{ pt: 2 }}>
        {/* <Table data={data} columns={columns} /> */}
        <StickyHeadTable
          columns={columns}
          rows={userData}
          count={users?.count || 0}
          next={
            users?.next ? callback => getUsers(users?.next, callback) : null
          }
          previous={
            users?.previous
              ? callback => getUsers(users?.previous, callback)
              : null
          }
          loading={loading}
        />
      </Box>
      <SimpleDialog
        component={getDialogContent(open, selectedId)}
        open={Boolean(open)}
        title="Bikesh Shrestha"
        onClose={handleClose}
      />
    </Box>
  )
}

export default Dashboard
