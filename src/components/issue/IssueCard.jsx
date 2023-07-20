import {
  Paper,
  Typography,
  Grid,
  Chip,
  CardContent,
  Avatar,
  Badge,
  ImageList,
  ImageListItem,
  CardMedia,
  Rating,
  IconButton,
  Button,
  Icon,
} from "@mui/material";
import React, { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import axios from "../../config/axiosConfig";

function IssueCard(props) {
  const { id, title, tags, attachments, description, creator, type, status } =
    props.issue;

  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    getComments();
  }, []);
  const getComments = () => {
    axios.get(`/issues/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  };

  return (
    <Paper elevation={2} sx={{ m: 4, p: 1 }} style={{ width: "70%" }}>
      <Grid
        container
        spacing={2}
        sx={{ p: 2, textDecoration: "none", color: "black" }}
        component={Link}
        to={`/issues/${id}`}
      >
        <Grid item xs={4}>
          <Typography variant="h5">{title}</Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Chip label={type?.name} />
          <Chip label={status} variant="outlined" />
        </Grid>
        {attachments?.length > 0 && (
          <Grid item xs={12}>
            <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
              <CardMedia sx={{ padding: 0 }}>
                {attachments?.length > 0 ? (
                  <ImageList
                    sx={{
                      maxHeight: 350,
                      borderRadius: "10px",
                      margin: 0,
                      padding: 0,
                    }}
                    cols={3}
                    rowHeight={160}
                  >
                    {attachments
                      ?.filter((x, idx) => idx < 3)
                      .map((item) => (
                        <ImageListItem
                          key={item?.url}
                          sx={{ borderRadius: "10px" }}
                        >
                          <img
                            style={{ borderRadius: "10px" }}
                            src={item?.url}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                  </ImageList>
                ) : (
                  ""
                )}
              </CardMedia>
            </CardContent>
          </Grid>
        )}
        <Grid item xs={12} sx={{ display: "flex", gap: 3 }}>
          {tags?.map((it) => {
            return <Chip label={it?.name} />;
          })}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <AvatarLabel>
            <Avatar
              style={{ marginRight: "14px" }}
              alt={creator?.firstname}
              src={creator?.profilePicture}
            />
            <Typography variant="body2">
              {creator?.firstname} {creator?.lastname}
            </Typography>
          </AvatarLabel>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          {/* <Badge color="secondary" badgeContent={comments.length}> */}
          <Button
            size="large"
            sx={{ gap: 1, textTransform: "lowercase" }}
            color="secondary"
          >
            <CommentIcon color="action" fontSize="large" />
            {comments?.length ?? 0} comments
          </Button>
          {/* </Badge> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default IssueCard;

const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;
