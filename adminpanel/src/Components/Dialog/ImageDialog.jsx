import React, { useState } from "react"
import { Modal, Box, Grid, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const ImageDialog = ({ images, open, onClose, selected }) => {
  const [currentImage, setCurrentImage] = useState(selected)
  console.log(selected, currentImage, "selected")
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ backgroundColor: "#22222279" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxWidth: "90%",
          //   bgcolor: "#22222279",
          //   boxShadow: 24,
          p: 2
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8
          }}
          onClick={onClose}
          style={{ backgroundColor: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} align="center">
            <img
              src={currentImage || selected}
              alt="Modal Image"
              style={{ maxWidth: "80%", marginTop: 30 }}
            />
          </Grid>
          {images.map((image, index) => (
            <Grid item key={image.id} xs={2}>
              <img
                src={image.image}
                alt={`Image ${image.id}`}
                onClick={() => setCurrentImage(image.image)}
                style={{ cursor: "pointer", width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ImageDialog
