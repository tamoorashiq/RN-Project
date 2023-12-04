import {
  Box,
  Typography,
  IconButton as IconBtn,
  Stack,
  Paper,
  Grid,
  Divider,
  TextField,
  ButtonGroup,
  Button,
  Select,
  FormControl,
  MenuItem
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import StickyHeadTable from "../../Components/Table/Table"
import TableMenu from "../../Components/Table/TableMenu"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckIcon from "@mui/icons-material/Check"
import SearchBar from "../../Components/Inputs/SearchBar"
import TuneIcon from "@mui/icons-material/Tune"
import MenuButton from "../../Components/Buttons/MenuButton"
import SimpleDialog from "../../Components/Dialog/SimpleDialog"
import DeleteFlagContent from "../../Components/DialogContent/DeleteFlagContent"
import BanUser from "../../Components/DialogContent/BanUser"
import qs from "qs"
import useFetch from "../../Utils/useFetch"
import { useSelector, useDispatch } from "react-redux"
import { ADD_FLAG } from "../../Redux/types"
import { GET_ALL_FLAG_API } from "../../Constant"
const options = [
  {
    name: "Delete Content"
  },
  {
    name: "Ban User"
  },
  {
    name: "Send Warning"
  },
  {
    name: "Remove Permanently"
  }
]

const columns = [
  { id: "serialNum", label: "S.N", width: 10 },

  {
    id: "report_type",
    label: "Report Type"
  },
  {
    id: "content_type",
    label: "Content type"
  },
  {
    id: "content_link",
    label: "Content Link"
  },
  {
    id: "posted_by",
    label: "Posted By"
  },
  {
    id: "reported_times",
    label: "Reported Times"
  },
  {
    id: "reported_by_comments",
    label: "Reported By Comments"
  },
  {
    id: "comments",
    label: "Comments"
  },
  {
    id: "menu",
    label: "",
    width: 30
  }
]
const Flags = () => {
  const { request } = useFetch()
  const dispatch = useDispatch()
  let users = useSelector(state => state.AllUserReducer?.users)
  const flags = useSelector(state => state.flagReducer?.flags)
  const [flagData, setFlagData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [isReply, setReply] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [tabSelected, setTabSelected] = useState("Users")
  const [sortBy, setSortBy] = useState("Newest")
  const open = Boolean(anchorEl)

  const handleMenuClick = (event, id) => {
    console.log(id, event, "id, event")
    setAnchorEl(event.currentTarget)
  }
  const handleClose = value => {
    setModalOpen(false)
  }
  const handleClick = (condition, id) => {
    // setCondition(condition)
    console.log(condition, "ayo")
    setModalOpen(condition)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const getDialogContent = type => {
    console.log(type, "dialog")
    switch (type) {
      case "Delete Content":
        return <DeleteFlagContent onClose={handleClose} />
      case "Ban User":
        return <BanUser title onClose={handleClose} />
      case "Send Warning":
        return <DeleteFlagContent title="Add User" onClose={handleClose} />
      case "Remove Permanently":
        return <DeleteFlagContent title="Add User" onClose={handleClose} />
    }
  }

  useEffect(() => {
    handleData()
  }, [flags?.results?.length, open])

  const handleData = data => {
    if (data?.results?.length || flags?.results?.length) {
      setFlagData([
        ...(data?.results || flags?.results)?.map((v, i) => {
          return {
            serialNum: i + 1,
            report_type: v.reason || "User",
            content_type: v.content_type,
            content_link: v.content_type,
            posted_by: v.posted_by || " - ",
            reported_times: v.reported_times,
            reported_by_comments: v.comment,
            comments: v.comment,
            menu: (
              <IconBtn
                aria-label="more"
                id={`long-button`}
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={e => handleMenuClick(e, i)}
                style={{ backgroundColor: Theme.bg.grey }}
              >
                <MoreVertIcon style={{ color: Theme.bg.bg2 }} />
              </IconBtn>
            )
          }
        })
      ])
    }
  }
  useEffect(() => {
    getFlags()
  }, [])
  const getFlags = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(
        api || GET_ALL_FLAG_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_FLAG,
          payload: api
            ? {
                ...res.data,
                results: [...flags.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
        handleData()
        console.log({
          ...res.data,
          results: [...res.data.results, ...flags.results].filter(
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

  console.log(flagData, "flagData")
  return (
    <Box
      sx={{ backgroundColor: Theme.bg.bgColor, px: 6, pt: 4, height: "100vh" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography sx={{ fontSize: "32px", fontWeight: 500 }}>
              Flags
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" color="info">
            <Button
              startIcon={tabSelected === "Users" ? <CheckIcon /> : null}
              style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
              onClick={() => setTabSelected("Users")}
            >
              Users
            </Button>
            <Button
              startIcon={tabSelected === "Contents" ? <CheckIcon /> : null}
              style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
              onClick={() => setTabSelected("Contents")}
            >
              Contents
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems={"center"}>
            <Grid item>
              <Typography variant="caption" style={{ fontWeight: "500" }}>
                Sort by
              </Typography>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  id="sort-by-select-small"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ borderRadius: 10, height: 35 }}
                  MenuListProps={{
                    sx: {
                      backgroundColor: Theme.bg.grey
                    }
                  }}
                >
                  <MenuItem value={"Newest"}>Newest</MenuItem>
                  <MenuItem value={"Oldest"}>Oldest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} align="right">
          <Grid
            container
            alignItems={"center"}
            spacing={1}
            justifyContent={"flex-end"}
          >
            <Grid item>
              <MenuButton
                data={[
                  "Reported Users",
                  "Reported Contents",
                  "Photo",
                  "Video",
                  "Messages",
                  "Posts"
                ]}
                btnIcon={<TuneIcon />}
                text="Filters"
              />
            </Grid>
            <Grid item>
              <SearchBar
                placeholder="Search"
                borderRadius={"28px"}
                minWidth={400}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onSubmit={getFlags}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StickyHeadTable
            columns={columns}
            rows={flagData}
            count={flags?.count || 0}
            next={
              flags?.next ? callback => getFlags(flags?.next, callback) : null
            }
            previous={
              flags?.previous
                ? callback => getFlags(flags?.previous, callback)
                : null
            }
            loading={loading}
          />
        </Grid>
      </Grid>

      <TableMenu
        handleClose={handleMenuClose}
        handleOptionClick={handleClick}
        open={open}
        anchorEl={anchorEl}
        selectedId={modalOpen}
        options={options}
      />
      <SimpleDialog
        component={getDialogContent(modalOpen)}
        open={Boolean(modalOpen)}
        title="Add Category"
        onClose={handleClose}
      />
    </Box>
  )
}

export default Flags
