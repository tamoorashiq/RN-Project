import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RequireAuth from "./RequireAuth"
import Drawer from "../Components/Drawer"

import SignIn from "../Screens/SignIn/index.jsx"
import Dashboard from "../Screens/Dashboard/index.jsx"
import {
  CATEGORIES_PATH,
  FEEDBACK_DETAILS_PATH,
  FLAGS_PATH,
  ITEMS_PATH,
  USER_ITEMS_PATH
} from "./Routes"
import Categories from "../Screens/Categories"
import Items from "../Screens/Items"
import UserItems from "../Screens/UserItems"
import Feedback from "../Screens/Feedback"
import FeedbackDetails from "../Screens/FeedbackDetails"
import Flags from "../Screens/Flags"

export const DASHBOARD_PATH = "/"
export const SCHEDULER_PATH = "/scheduler"
export const TECHNICIAN_PATH = "/technician"
export const JOBS_PATH = "/jobs"
export const CLIENTS_PATH = "/clients"
export const PROPERTIES_PATH = "/properties"
export const SERVICES_PATH = "/services"
export const FEEDBACK_PATH = "/feedback"
export const SETTING_PATH = "/setting"
export const SIGNIN_PATH = "/signin"
export const NOTIFICATION_PATH = "/notification"
export const TECHNICIAN_PROFILE_PATH = "/technician/:id"
export const SCHEDULE_NEW_JOB_PATH = "/jobs/schedule-new-job"
export const CLIENT_PROFILE_PATH = "/clients/:id"
export const PROPERTY_INFO_PATH = "/property/:id"
export const JOB_INFO_PATH = "/jobs/:id"
export const SERVICE_INFO_PATH = "/services/:id"

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Drawer />,
    element: (
      <RequireAuth>
        <Drawer />
      </RequireAuth>
    ),
    children: [
      {
        path: DASHBOARD_PATH,
        element: <Dashboard />
      },
      {
        path: CATEGORIES_PATH,
        element: <Categories />
      },
      {
        path: ITEMS_PATH,
        element: <Items />
      },
      {
        path: USER_ITEMS_PATH,
        element: <UserItems />
      },
      {
        path: FEEDBACK_PATH,
        element: <Feedback />
      },
      {
        path: FEEDBACK_DETAILS_PATH,
        element: <FeedbackDetails />
      },
      {
        path: FLAGS_PATH,
        element: <Flags />
      }
    ]
  },
  {
    path: SIGNIN_PATH,
    element: <SignIn />
  }
])

const Navigation = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default Navigation
