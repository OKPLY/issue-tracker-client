import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Filter } from "@mui/icons-material";
import { toast } from "react-toastify";

const removeImgStyle = {
  cursor: "pointer",
  float: "right",
  marginTop: "5px",
  marginRight: "5px",
  marginLeft: "auto",
  marginBottom: "-25px",

  zIndex: "10000",
  backgroundColor: "white",
  borderRadius: 1000,
  width: "20px",
  height: "20px",
};

function SelectImagesComponent({ selectedImages, setSelectedImages }) {
  const [progress, setProgress] = useState([]);
  function imageSelectedHandler(event) {
    //Validate and store images
    const uploaded = [...selectedImages];
    Array.from(event.target.files).forEach((file) => {
      if (isValidImage(file)) {
        uploaded.push({ key: Math.random(), file: file });
        //setProgress((prev) => [...prev, 80]);
      }
    });
    setSelectedImages(uploaded);
  }

  function removeImageFromList(image) {
    //Remove image from array
    setSelectedImages(
      selectedImages.filter((img, index) => {
        if (img != image) {
          //   setProgress((prev) => [
          //     ...prev.slice(0, index),
          //     ...prev.slice(index + 1),
          //   ]);
          return true;
        }
        return false;
      })
    );
  }

  function isValidImage(file) {
    const extension = getExtension(file.name).toLowerCase();
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      return true;
    }
    toast.error("Unsupported file type for: " + extension);
    return false;
  }

  function getExtension(filename) {
    return filename.split(".").pop();
  }
  return (
    <Stack spacing={3}>
      <Typography variant="h6" align="center">
        Attachments
      </Typography>
      {selectedImages?.length > 0 ? (
        <ImageList
          sx={{ minHeight: 350, maxHeight: 350, borderRadius: "10px" }}
          cols={3}
          gap={8}
        >
          {selectedImages.map((image, index) => (
            <ImageListItem key={image.key}>
              <Close
                onClick={() => removeImageFromList(image)}
                size={30}
                style={removeImgStyle}
              />
              {/* <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  sx={{ margin: "auto" }}
                  variant="determinate"
                  value={progress?.at(index)}
                />
              </div> */}

              <img
                style={{ borderRadius: "10px" }}
                src={URL.createObjectURL(image.file)}
                srcSet={URL.createObjectURL(image.file)}
                alt={URL.createObjectURL(image.file)}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Box>
          <Typography variant="h6" my={20} align="center" color="darkgray">
            No Images Selected
          </Typography>
        </Box>
      )}

      <Button
        component="label"
        variant="outlined"
        startIcon={<Filter />}
        fullWidth
      >
        Add Attachments
        <input
          multiple="multiple"
          onChange={imageSelectedHandler}
          type="file"
          accept="image/*"
          hidden
        />
      </Button>
    </Stack>
  );
}

export default SelectImagesComponent;
