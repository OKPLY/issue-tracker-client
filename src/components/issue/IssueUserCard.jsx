import { Avatar, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

function IssueUserCard({ title, user, date }) {
  return (
    <Stack>
      <Paper>
        <Box
          p={2}
          pb={0}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="body2"> {title} </Typography>

          {date && (
            <Typography variant="body2">
              {new Date(date).toLocaleString()}
            </Typography>
          )}
        </Box>

        <Box p={1}>
          <Paper>
            <Stack direction="row" spacing={2} p={1.5}>
              <Avatar alt={user?.firstname} src={user?.profilePicture} />

              <Stack>
                <Typography variant="body">
                  {user?.firstname} {user?.lastname}
                </Typography>
                <Typography variant="body2" sx={{ color: "darkgray" }}>
                  {user?.email}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Paper>
    </Stack>
  );
}

export default IssueUserCard;
