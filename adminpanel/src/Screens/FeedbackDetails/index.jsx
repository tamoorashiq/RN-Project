import {
  Box,
  Typography,
  IconButton as IconBtn,
  Stack,
  Paper,
  Grid,
  Divider,
  TextField
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import { useSelector, useDispatch } from "react-redux"
import StickyHeadTable from "../../Components/Table/Table.jsx"
import AVATAR_IMG from "../../Assets/Images/avatar.png"
import { Link } from "react-router-dom"
import IconButton from "../../Components/Buttons/IconButton"
import ReplyIcon from "@mui/icons-material/Reply"
import SendIcon from "@mui/icons-material/Send"
import { useLocation } from "react-router-dom"
import qs from "qs"
import useFetch from "../../Utils/useFetch"
import { REPLY_FEEDBACK_API } from "../../Constant"
import { ADD_FEEDBACK } from "../../Redux/types"
import { toast } from "react-toastify"
const FeedbackDetails = () => {
  const { request } = useFetch()
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = qs.parse(location.search?.replace("?", ""))

  const id = queryParams.id
  const feedbacks = useSelector(state => state.feedbackReducer.feedbacks)
  const feedbackData = useSelector(state =>
    state.feedbackReducer.feedbacks?.results?.find(
      feedback => feedback.id == id
    )
  )
  const [isReply, setReply] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reply, setReplyText] = useState(feedbackData?.reply || "")
  const [error, setError] = useState("")
  console.log(id, feedbackData)

  const NameComponent = ({ id, name }) => {
    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <img
          src={feedbackData?.profile_image || AVATAR_IMG}
          alt=""
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Link
          // to={`/feedback-details`}
          style={{
            textDecoration: "none",
            color: Theme.color.text,
            fontWeight: "500",
            fontSize: 15
          }}
        >
          {feedbackData?.name || "-"}
        </Link>
      </Box>
    )
  }

  const sendReply = async () => {
    try {
      if (!reply) {
        setError("Feedback Field is required")
        return
      }
      setError("")
      setLoading(true)
      const req = await request(REPLY_FEEDBACK_API.replace(":id", id), "PUT", {
        reply
      })
      console.log(req)
      if (req.status === 200) {
        toast.success("Replied Successfully!")
        const catObj = { ...feedbacks }

        const index = catObj.results.findIndex(v => v.id === id)
        console.log(index)
        catObj.results[index] = req.data

        dispatch({
          type: ADD_FEEDBACK,
          payload: catObj
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
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

      <Box sx={{ pt: 2, width: "70%" }}>
        <Paper
          elevation={0}
          sx={{ backgroundColor: "#0000000D", borderRadius: 3 }}
        >
          <Grid container sx={{ p: 2 }} justifyContent={"space-between"}>
            <Grid item>
              <NameComponent name="Bikesh Achariya" />
            </Grid>
            <Grid item>
              {!isReply && (
                <IconButton
                  text={"Reply"}
                  disableElevation
                  startIcon={<ReplyIcon />}
                  sx={{
                    borderRadius: 40,
                    px: 2.5,
                    py: 1,
                    borderColor: Theme.bg.dialogBg
                  }}
                  variant="outlined"
                  onClick={() => setReply(true)}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ marginLeft: 9, paddingBottom: 3, marginTop: -2 }}
          >
            <Grid item xs={12}>
              <Typography variant="caption" style={{ fontWeight: "500" }}>
                {feedbackData?.email_address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" style={{ fontWeight: "500" }}>
                {feedbackData?.subject}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ py: 1 }}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>

          <Grid container sx={{ marginLeft: 9, paddingBottom: 3 }} spacing={3}>
            <Grid item xs={7}>
              <Typography variant="caption">{feedbackData?.message}</Typography>
            </Grid>
            <Grid item xs={7}>
              {!isReply ? (
                <IconButton
                  text={"Reply"}
                  disableElevation
                  startIcon={<ReplyIcon />}
                  sx={{
                    borderRadius: 40,
                    px: 2.5,
                    py: 1,
                    borderColor: Theme.bg.dialogBg
                  }}
                  variant="outlined"
                  onClick={() => setReply(true)}
                />
              ) : (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    label="Feedback"
                    multiline
                    rows={4}
                    fullWidth={true}
                    value={reply}
                    onChange={e => setReplyText(e.target.value)}
                    error={error}
                    helperText={error}
                  />
                  <IconButton
                    text={"Send"}
                    disableElevation
                    startIcon={<SendIcon />}
                    sx={{
                      borderRadius: 40,
                      px: 2.5,
                      py: 1,
                      borderColor: Theme.bg.dialogBg,
                      marginTop: 1
                    }}
                    variant="outlined"
                    onClick={sendReply}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}

export default FeedbackDetails
