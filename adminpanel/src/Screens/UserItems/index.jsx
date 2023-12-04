import { Box, Typography, IconButton as IconBtn, Paper } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Theme } from "../../Theme"
import ItemCard from "../../Components/Cards/ItemCard"
import { Link, useLocation } from "react-router-dom"
import qs from "qs"
import { ADD_USER_ITEMS } from "../../Redux/types"
import { GET_MANAGE_ITEMS_API } from "../../Constant"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../Utils/useFetch"
import TablePagination from "../../Components/Table/TablePagination"
const UserItems = () => {
  const dispatch = useDispatch()
  const { request } = useFetch()
  const [loading, setLoading] = useState("")
  const location = useLocation()
  const [loadingScroll, setLoadingScroll] = useState(false)
  const queryParams = qs.parse(location.search?.replace("?", ""))
  const userItems = useSelector(state => state.itemReducer.userItems)

  const user_id = queryParams.user_id
  const getUserItems = async (api = null) => {
    try {
      setLoading(true)
      setLoadingScroll(true)
      let searchObj = {}

      searchObj.user = user_id
      const res = await request(
        api || GET_MANAGE_ITEMS_API + "?" + qs.stringify(searchObj)
      )
      if (res.status === 200) {
        dispatch({
          type: ADD_USER_ITEMS,
          payload: api
            ? {
                ...res.data,
                results: [...userItems.results, ...res.data.results].filter(
                  (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i
                )
              }
            : res?.data
        })
        console.log({
          ...res.data,
          results: [...res.data.results, ...userItems.results].filter(
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
    } finally {
      setLoadingScroll(false)
    }
  }

  useEffect(() => {
    getUserItems()
  }, [])
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollHeight - scrollTop === clientHeight && !loadingScroll) {
      if (userItems.next) {
        getUserItems(userItems?.next)
      }
    }
  }
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [loadingScroll])
  return (
    <Box
      sx={{ backgroundColor: Theme.bg.bgColor, px: 6, pt: 4, height: "100vh" }}
    >
      <Box>
        <Typography sx={{ fontSize: "32px", fontWeight: 500, marginBottom: 1 }}>
          All Items by Dipesh Achariya
        </Typography>
        <Link
          to={`/items`}
          style={{
            textDecoration: "none",
            fontWeight: "600",
            fontSize: 14
          }}
        >
          Back
        </Link>
      </Box>
      <Box sx={{ pt: 2, marginTop: 1 }}>
        <Paper sx={{ p: 1 }}>
          {userItems?.results?.map((v, i) => {
            return <ItemCard key={i} data={v} />
          })}
          <TablePagination
            setPage={() => {}}
            data={userItems?.results || []}
            count={userItems?.count || 0}
            next={
              userItems?.next
                ? callback => getUserItems(userItems?.next, callback)
                : null
            }
            previous={
              userItems?.previous
                ? callback => getUserItems(userItems?.previous, callback)
                : null
            }
            loading={loading}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default UserItems
