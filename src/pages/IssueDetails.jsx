import React from "react";
import Header from "../components/layout/Header";
import { useParams } from "react-router";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import IssueUserCard from "../components/issue/IssueUserCard";
import ShowImagesComponent from "../components/images/ShowImagesComponent";
import Zoom from "react-medium-image-zoom";
import NewCommentCard from "../components/comment/NewCommentCard";
import CommentDetail from "../components/comment/CommentDetail";

function IssueDetails() {
  const [issue, setIssue] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    getIssue();
  }, []);

  React.useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios.get(`/issues/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  };

  const getIssue = () => {
    axios
      .get(`/issues/${id}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message ?? "Something went wrong");
      });
  };
  return (
    <>
      <Header title="Issue Details" />

      <Grid container spacing={3} p={4}>
        <Grid item xs={12} lg={9}>
          <Stack spacing={3}>
            <Paper>
              <Stack sx={{ py: 2, px: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">{issue?.title}</Typography>

                  <Stack direction="row" spacing={2}>
                    <Chip label={issue?.type?.name} />
                    <Chip label={issue?.status} variant="outlined" />
                  </Stack>
                </Box>
                <Typography variant="body2">{issue?.description}</Typography>
                <Stack direction="row" spacing={2} mt={1}>
                  {issue?.tags?.map((tag) => (
                    <Chip label={tag?.name} />
                  ))}
                </Stack>
              </Stack>
            </Paper>

            {issue?.attachments?.length > 0 && (
              <Paper>
                <Stack p={2} pb={1}>
                  <Typography variant="h6" align="center">
                    Attachments
                  </Typography>
                  <ShowImagesComponent images={issue?.attachments} />
                </Stack>
              </Paper>
            )}

            <Typography variant="h6" align="center">
              Comments
            </Typography>
            <Paper elevation={2} sx={{ p: 2 }}>
              <NewCommentCard id={id} getComments={getComments} />
            </Paper>
            {comments?.length > 0 &&
              comments?.map((comment) => <CommentDetail comment={comment} />)}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Stack spacing={2}>
            <IssueUserCard
              title="Creation"
              date={issue?.createdAt}
              user={issue?.creator}
            />
            {issue?.reviewer && (
              <IssueUserCard
                date={issue?.assignedAt}
                title="Review"
                user={issue?.reviewer}
              />
            )}
            {issue?.reviewer && (
              <IssueUserCard
                date={issue?.resolvedAt}
                title="Resolution"
                user={issue?.resolver}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default IssueDetails;
