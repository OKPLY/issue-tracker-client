import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Header from "../components/layout/Header";

function NewIssue() {
  return (
    <>
      <Header title="Create New Issue" />
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
    </>
  );
}

export default NewIssue;
