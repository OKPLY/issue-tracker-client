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
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import RelatedIssueCard from "../components/issue/RelatedIssueCard";
import { PERMISSION, STATUS } from "../util/constants";
import ReviewIssue from "../components/issue/ReviewIssue";
import ResolveIssues from "./ResolveIssues";
import ResolveIssue from "../components/issue/ResolveIssue";
import StatusChip from "../components/issue/StatusChip";
import { useAuth } from "../contexts/AuthContext";

function IssueDetails() {
  const auth = useAuth();
  const [issue, setIssue] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [relatedIssues, setRelatedIssues] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    getIssue();
  }, [id]);

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
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });

    axios
      .get(`/issues/${id}/issues`)
      .then((res) => {
        setRelatedIssues(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
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
                    <Chip label={issue?.type?.name} variant="outlined" />
                    <StatusChip label={issue?.status} />
                  </Stack>
                </Box>
                <Typography variant="body2">{issue?.description}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Stack direction="row" spacing={2} mt={1}>
                    {issue?.tags?.map((tag) => (
                      <Chip label={tag?.name} />
                    ))}
                  </Stack>
                  {issue?.parentIssue?.id && (
                    <Link to={`/issues/${issue?.parentIssue?.id}`}>
                      <Button variant="outlined"> Parent Issue </Button>
                    </Link>
                  )}
                </Box>
              </Stack>
            </Paper>

            {issue?.status == STATUS.CREATED &&
              auth?.permissions?.includes(PERMISSION.AssignIssue) && (
                <Paper>
                  <ReviewIssue issue={issue} getIssue={getIssue} />
                </Paper>
              )}

            {issue?.status == STATUS.ASSIGNED &&
              auth?.permissions?.includes(PERMISSION.ResolveIssue) && (
                <Paper>
                  <ResolveIssue issue={issue} getIssue={getIssue} />
                </Paper>
              )}

            {auth?.permissions?.includes(PERMISSION.ReadAttachment) &&
              issue?.attachments?.length > 0 && (
                <Paper>
                  <Stack p={2} pb={1}>
                    <Typography variant="h6" align="center">
                      Attachments
                    </Typography>
                    <ShowImagesComponent images={issue?.attachments} />
                  </Stack>
                </Paper>
              )}
            {auth?.permissions?.includes(PERMISSION.ReadComment) && (
              <>
                <Typography variant="h6" align="center">
                  {comments?.length > 0 && comments?.length} Comments
                </Typography>
                {auth?.permissions?.includes(PERMISSION.CreateComment) && (
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <NewCommentCard id={id} getComments={getComments} />
                  </Paper>
                )}
                {comments?.length > 0 &&
                  comments?.map((comment) => (
                    <CommentDetail comment={comment} />
                  ))}
              </>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Stack spacing={2}>
            {relatedIssues?.length > 0 && (
              <>
                <Typography variant="h6" align="center">
                  Related Issues
                </Typography>
                {relatedIssues?.map((issue) => (
                  <RelatedIssueCard issue={issue} />
                ))}
              </>
            )}

            <Link to={`/issues/new?issueId=${id}`}>
              <Button variant="outlined" color="primary" fullWidth>
                Create New Related Issue
              </Button>
            </Link>
            <Box></Box>
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
            {issue?.resolver && (
              <IssueUserCard
                date={issue?.resolvedAt}
                title={issue?.resolvedAt ? "Resolution" : "Assignee"}
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
