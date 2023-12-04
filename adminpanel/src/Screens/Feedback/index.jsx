import { Box, Typography, IconButton as IconBtn, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import { useSelector, useDispatch } from "react-redux"
import StickyHeadTable from "../../Components/Table/Table.jsx"
import AVATAR_IMG from "../../Assets/Images/avatar.png"
import { Link } from "react-router-dom"
import { GET_ALL_FEEDBACK_API } from "../../Constant"
import { ADD_FEEDBACK } from "../../Redux/types"
import qs from "qs"

import useFetch from "../../Utils/useFetch"
import { toast } from "react-toastify"
const Feedback = () => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [feedbackData, setFeedbackData] = useState([])
  const users = useSelector(state => state.AllUserReducer?.users)
  const feedbacks = useSelector(state => state.feedbackReducer?.feedbacks)

  const columns = [
    {
      id: "name",
      label: "Name",
      width: 170
    },
    {
      id: "email",
      label: "Email",
      width: 170
    },
    {
      id: "subject",
      label: "Subject",
      width: 170
    }
  ]
  const NameComponent = ({ id, name, image }) => {
    return (
      <Link
        to={`/feedback-details?id=${id}`}
        style={{ textDecoration: "none", color: Theme.color.text }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <img
            src={image || AVATAR_IMG}
            alt=""
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />

          {name}
        </Box>
      </Link>
    )
  }

  useEffect(() => {
    console.log(feedbacks?.results, "CATEGORIES CHECKING FIELD")
    if (feedbacks?.results?.length) {
      setFeedbackData(
        feedbacks?.results?.map(v => {
          console.log(v, "SET_FEEDBACK")
          return {
            name: (
              <NameComponent
                image={v.profile_image}
                id={v.id}
                name={v.name || "-"}
              />
            ),
            email: v.email_address,
            subject: v.subject
          }
        })
      )
    }
  }, [feedbacks?.results?.length])
  useEffect(() => {
    getFeedbacks()
  }, [])

  const getFeedbacks = async (api = null) => {
    try {
      console.log(api)
      setLoading(true)

      let searchObj = {}

      if (searchText) {
        searchObj.search = searchText
      }
      const res = await request(
        api || GET_ALL_FEEDBACK_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_FEEDBACK,
          payload: api
            ? {
                ...res.data,
                results: [...feedbacks.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
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
          Feedbacks
        </Typography>
      </Box>

      <Box sx={{ pt: 2 }}>
        {/* <Table data={data} columns={columns} /> */}
        <StickyHeadTable
          columns={columns}
          rows={feedbackData}
          count={feedbacks?.count || 0}
          next={
            feedbacks?.next
              ? callback => getFeedbacks(feedbacks?.next, callback)
              : null
          }
          previous={
            feedbacks?.previous
              ? callback => getFeedbacks(feedbacks?.previous, callback)
              : null
          }
          loading={loading}
        />
      </Box>
    </Box>
  )
}

export default Feedback
