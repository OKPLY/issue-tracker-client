import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import axios from "../../config/axiosConfig";
import AlertDialog from "../fragments/AlertDialog";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ResolveIssue({ issue, getIssue }) {
  const [openResolve, setOpenResolve] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenResolve(true);
  };

  const handleResolve = () => {
    axios
      .post(`issues/${issue?.id}/resolve`, {
        id: issue?.id,
      })
      .then((res) => {
        toast.success("Issue assigned successfully");
        getIssue();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <Stack p={2} spacing={1}>
      <Typography variant="h6" align="center">
        Resolve Issue
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={2}>
          <Button sx={{ px: 2 }} type="submit" variant="contained" fullWidth>
            Resolve
          </Button>

          <Button variant="outlined" color="primary" fullWidth>
            <Link
              to={`/issues/new?issueId=${issue?.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Create New Related Issue
            </Link>
          </Button>
        </Stack>
        <AlertDialog
          open={openResolve}
          setOpen={setOpenResolve}
          handle={handleResolve}
          title="Resolve Issue"
          color="primary"
          label="Resolve"
          description="Are you sure you want to resolve this issue? this process is irreversible"
        />
      </form>
    </Stack>
  );
}

export default ResolveIssue;
