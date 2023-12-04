import Dashboard from "../Screens/Dashboard/index.jsx"
// import SignIn from "../Screens/SignIn/index.jsx"
// import Scheduler from "../Screens/Scheduler/index.jsx"
// import Technician from "../Screens/Technician/index.jsx"
// import Jobs from "../Screens/Jobs/index.jsx"
// import Clients from "../Screens/Clients/index.jsx"
// import Properties from "../Screens/Properties/index.jsx"
// import Services from "../Screens/Services/index.jsx"
// import Feedback from "../Screens/Feedback/index.jsx"
// import Setting from "../Screens/Setting/index.jsx"

// import DashboardIcon from "../Assets/Icons/Dashboard.svg"
// import SchedulerIcon from "../Assets/Icons/Scheduler.svg"
// import TechnicianIcon from "../Assets/Icons/Technician.svg"
// import JobsIcon from "../Assets/Icons/Jobs.svg"
// import ClientsIcon from "../Assets/Icons/Clients.svg"
// import PropertiesIcon from "../Assets/Icons/Properties.svg"
// import ServicesIcon from "../Assets/Icons/Services.svg"
// import FeedbackIcon from "../Assets/Icons/Feedback.svg"
// import SettingIcon from "../Assets/Icons/Setting.svg"
// import PropertyInfo from "../Screens/PropertyInfo/index.jsx"
// import Notification from "../Screens/Notification/index.jsx"

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined"
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined"
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp"
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined"
import Categories from "../Screens/Categories/index.jsx"

// import { createBrowserRouter } from 'react-router-dom';

export const DASHBOARD_PATH = "/"
export const CATEGORIES_PATH = "/categories"
export const FLAGS_PATH = "/flags"
export const ITEMS_PATH = "/items"
export const FEEDBACK_PATH = "/feedback"
export const FEEDBACK_DETAILS_PATH = "/feedback-details"
export const USER_ITEMS_PATH = "/all-items"

const ROUTES = [
  {
    id: 1,
    title: "All Users",
    path: DASHBOARD_PATH,
    element: Dashboard,
    authRequired: false,
    icon: <PeopleAltOutlinedIcon />,
    sidebar: true
  },
  {
    id: 2,
    title: "Categories",
    path: CATEGORIES_PATH,
    element: Categories,
    authRequired: false,
    icon: <CategoryOutlinedIcon />,
    sidebar: true
  },
  {
    id: 3,
    title: "Items",
    path: ITEMS_PATH,
    element: Dashboard,
    authRequired: false,
    icon: <ClassOutlinedIcon />,
    sidebar: true
  },
  {
    id: 4,
    title: "Flags",
    path: FLAGS_PATH,
    element: Dashboard,
    authRequired: false,
    icon: <OutlinedFlagSharpIcon />,
    sidebar: true
  },
  {
    id: 5,
    title: "Feedback",
    path: FEEDBACK_PATH,
    element: Dashboard,
    authRequired: false,
    icon: <ThumbsUpDownOutlinedIcon />,
    sidebar: true
  }

  // {
  //   title: 'SignIn',
  //   path: SIGNIN_PATH,
  //   element: SignIn,
  //   authRequired: false,
  //   // icon: SettingIcon,
  //   sidebar: true,
  // },
]
export default ROUTES
