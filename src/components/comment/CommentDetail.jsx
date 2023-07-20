import { Avatar, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import axios from "../../config/axiosConfig";
import NewCommentCard from "./NewCommentCard";
import ShowImagesComponent from "../images/ShowImagesComponent";

function CommentDetail({ comment, forComment }) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    getComments();
  }, []);
  const getComments = () => {
    axios.get(`/comments/${comment?.id}/comments`).then((res) => {
      setComments(res.data);
    });
  };
  return (
    <>
      <Paper
        elevation={forComment ? 0 : 1}
        sx={{ flexGrow: 1, display: "flex" }}
      >
        <Stack
          direction="row"
          spacing={2}
          mt={1}
          p={forComment ? 0 : 2}
          sx={{ flexGrow: 1 }}
        >
          <Avatar
            src={comment?.user?.profilePicture}
            alt={comment?.user?.firstName}
          />

          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body">
                  {comment?.user?.firstname} {comment?.user?.lastname}
                </Typography>

                <Typography variant="body2" color="darkgray">
                  {new Date(comment?.createdAt ?? null).toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="body2">{comment?.commentText}</Typography>
            </Stack>

            {comment?.attachments?.length > 0 && (
              <ShowImagesComponent images={comment?.attachments} forComment />
            )}

            {comments?.length > 0 && (
              <Stack spacing={2}>
                {comments?.map((comment) => (
                  <CommentDetail comment={comment} forComment />
                ))}
              </Stack>
            )}

            {!forComment && (
              <Box pt={1}>
                <NewCommentCard
                  id={comment?.id}
                  getComments={getComments}
                  forComment
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default CommentDetail;
