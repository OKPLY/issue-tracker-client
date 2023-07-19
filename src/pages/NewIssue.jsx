import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

function NewIssue() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create New Issue
        </Typography>
      </Box>
    </Container>
  );
}

export default NewIssue;
