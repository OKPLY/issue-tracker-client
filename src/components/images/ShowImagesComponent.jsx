import { Close } from "@mui/icons-material";
import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import Zoom from "react-medium-image-zoom";

function ShowImagesComponent({ images, forComment }) {
  return (
    <>
      {images?.length > 0 && (
        <ImageList
          sx={{
            ...(forComment ? { maxHeight: 100 } : { maxHeight: 160 }),
            borderRadius: "10px",
          }}
          cols={4}
          gap={6}
        >
          {images.map((image, index) => (
            <Zoom key={image.key}>
              <ImageListItem>
                <img
                  style={{ borderRadius: "10px" }}
                  src={image?.url}
                  alt="Attachment"
                  loading="lazy"
                />
              </ImageListItem>
            </Zoom>
          ))}
        </ImageList>
      )}
    </>
  );
}

export default ShowImagesComponent;
