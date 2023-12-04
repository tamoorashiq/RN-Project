import React, { useState, useEffect } from "react"
import { Paper, Grid, Typography, Chip, Box } from "@mui/material"
import { Theme } from "../../Theme"
import ICE_IMAGE from "./../../Assets/Images/ice.jpg"
import AVATAR_IMAGE from "./../../Assets/Images/avatar.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import ImageDialog from "../Dialog/ImageDialog"
import PinDropIcon from "@mui/icons-material/PinDrop"
const ItemCard = ({ data }) => {
  const category = useSelector(
    state => state.itemReducer.allCategories
  )?.results?.find(v => v.id === data?.category)

  const [open, setOpen] = useState(false)
  // console.log(data, "DATA")
  return (
    <>
      <Paper
        elevation={false}
        sx={{
          backgroundColor: "#0000000D",
          p: 1,
          borderRadius: 2,
          marginTop: 1
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Grid container alignItems={"center"} justifyContent={"center"}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      minWidth: 120
                    }}
                  >
                    <img
                      src={data?.media?.[0]?.image ?? ICE_IMAGE}
                      style={{
                        width: "100%",
                        height: 120,
                        borderRadius: 5
                      }}
                      onClick={() =>
                        setOpen(data?.media?.[0]?.image || ICE_IMAGE)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      {data?.media?.map(
                        (v, i) =>
                          i !== 0 && (
                            <Grid item xs={3} key={v.id} align="center">
                              <img
                                src={v.image}
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderRadius: 5
                                }}
                                onClick={() => setOpen(v.image)}
                              />
                            </Grid>
                          )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid container sx={{ p: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontWeight: "600" }}>
                      {data?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" style={{ fontWeight: "500" }}>
                      <PinDropIcon
                        color="primary"
                        style={{ fontSize: 13, marginBottom: -2 }}
                      />
                      {data?.location?.city}, {data?.location?.state},{" "}
                      {data?.location?.zip_code}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" style={{ lineHeight: 1 }}>
                      {data?.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Grid
              container
              justifyItems={"center"}
              alignItems={"center"}
              style={{ height: "100%" }}
            >
              <Grid item xs={6} align={"center"}>
                <Chip label={category?.name} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography variant="caption">Estimate Value</Typography>
                  <Typography variant="h6" style={{ fontWeight: "500" }}>
                    ${data?.estimated_amount}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Grid
              container
              justifyItems={"center"}
              alignItems={"center"}
              style={{ height: "100%" }}
              spacing={1}
            >
              <Grid item>
                <img
                  src={data?.user_details?.profile_image || AVATAR_IMAGE}
                  alt=""
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    <Link
                      // to={`/technician/${id}`}
                      style={{
                        textDecoration: "none",
                        color: Theme.color.text,
                        fontWeight: "600",
                        fontSize: 14
                      }}
                    >
                      {data?.user_details?.full_name}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption">
                      <PinDropIcon
                        color="primary"
                        style={{ fontSize: 13, marginBottom: -2 }}
                      />
                      {data?.user_details?.street_address},{" "}
                      {data?.user_details?.state}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Link
                  to={`/all-items/?user_id=${data?.user}`}
                  style={{
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: 14
                  }}
                >
                  See All
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ImageDialog
        images={data?.media}
        open={Boolean(open)}
        onClose={() => setOpen(false)}
        selected={open}
      />
    </>
  )
}

export default ItemCard
