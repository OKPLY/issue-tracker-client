import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function StatCard({ title, value }) {
  return (
    <Paper>
      <Box paddingX={4} paddingY={2}>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
    </Paper>
  );
}

export default StatCard;
