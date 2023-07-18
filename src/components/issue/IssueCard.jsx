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
import { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function IssueCard(props) {
  const {
    title,
    tags,
    attachments,
    description,
    user,
    type,
    status,
    comments,
  } = props.issue;

  return (
    <Paper elevation={2} sx={{ m: 4 }} style={{ width: "70%" }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={4}>
          <Typography variant="h5">{title}</Typography>
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
          <Chip label={type} />
          <Chip label={status} variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <CardMedia>
              {attachments.length > 0 ? (
                <ImageList sx={{ maxHeight: 350 }} cols={3} rowHeight={164}>
                  {attachments.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=164&h=164&fit=contain&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=fill&auto=format&dpr=2 2x`}
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
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", gap: 3 }}>
          {tags.map((it) => {
            return <Chip label={it} />;
          })}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Avatar alt={user.name} src={user.profilePic} />
          <Rating
            name="simple-controlled"
            value={3}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
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
            {"  "}
            {comments.length}
            {"  "} comments
          </Button>
          {/* </Badge> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default IssueCard;
