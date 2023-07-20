import {
  Avatar,
  Box,
  Button,
  Collapse,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Attachment, Send } from "@mui/icons-material";
import SelectImagesComponent from "../images/SelectImagesComponent";
import handleUpload from "../../util/uploadFile";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";

function NewCommentCard({ id, forComment, getComments }) {
  const auth = useAuth();
  const [showAttachment, setShowAttachment] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const data = {
      commentText: comment,
      attachments: [],
    };

    if (selectedImages?.length == 0) submit(data);

    for (var i = 0; i < selectedImages.length; i++) {
      handleUpload(
        selectedImages[i].file,
        () => {},
        (url) => {
          data.attachments.push({ url: url });

          if (selectedImages.length == data.attachments.length) submit(data);
        }
      );
    }
  };

  const submit = (data) => {
    var route = `/issues/${id}/comments`;

    if (forComment) route = `/comments/${id}/comments`;

    axios
      .post(route, data)
      .then((res) => {
        setComment("");
        setSelectedImages([]);
        setIsLoading(false);
        getComments();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message ?? "Something went wrong");
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Stack direction="row" spacing={2}>
          <Avatar alt={auth?.firstname} src={auth?.profilePicture} />
          <TextField
            required
            size="small"
            fullWidth
            value={comment}
            label="New Comment"
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            variant="outlined"
            onClick={() => setShowAttachment((prev) => !prev)}
          >
            <Attachment />
          </Button>

          <Button type="submit" variant="contained" disabled={isLoading}>
            <Send />
          </Button>
        </Stack>

        <Collapse in={showAttachment}>
          <Box mt={2}>
            <SelectImagesComponent
              comment
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          </Box>
        </Collapse>
      </Stack>
    </form>
  );
}

export default NewCommentCard;
