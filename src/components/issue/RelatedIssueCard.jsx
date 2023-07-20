import { Chip, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

function RelatedIssueCard({ issue }) {
  return (
    <Paper
      component={Link}
      to={`/issues/${issue?.id}`}
      sx={{ textDecoration: "none" }}
    >
      <Box
        p={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{issue?.title}</Typography>

        <Chip size="small" label={issue?.status} variant="outlined" />
      </Box>
    </Paper>
  );
}

export default RelatedIssueCard;
