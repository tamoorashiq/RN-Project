import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
// import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { Link, Outlet } from "react-router-dom"
import ROUTES from "../../Navigation/Routes"
import { Theme } from "../../Theme"
import REFRESH_IMG from "../../Assets/Images/Refresh.png"

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        // backgroundColor: "#fafafa",
        minHeight: "100vh",
        width: "auto",
        boxSizing: "border-box"
      }}
    >
      {/* <CssBaseline /> */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: "100px",
          backgroundColor: Theme.bg.bg2,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100px",
            boxSizing: "border-box",
            backgroundColor: Theme.bg.bg2
          }
        }}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleDrawerClose}>
            <img src={REFRESH_IMG} alt="" />
          </IconButton>
        </DrawerHeader>
        <List>
          {ROUTES.map((v, index) => (
            <ListItem key={v.id} disablePadding sx={{ display: "block" }}>
              <Link to={v.path} style={{ textDecoration: "none" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      // mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: Theme.color.text
                    }}
                  >
                    {v.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={v.title}
                    sx={{ color: Theme.color.text, textAlign: "center" }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pl: 4.5 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
