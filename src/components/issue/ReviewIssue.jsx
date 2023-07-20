import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import axios from "../../config/axiosConfig";
import AlertDialog from "../fragments/AlertDialog";
import { toast } from "react-toastify";

function ReviewIssue({ issue, getIssue }) {
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openAssign, setOpenAssign] = React.useState(false);
  const [openClose, setOpenClose] = React.useState(false);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenAssign(true);
  };

  const handleAssign = () => {
    axios
      .post(`issues/${issue?.id}/assign`, {
        id: issue?.id,
        resolver: { id: selectedUser?.id },
      })
      .then((res) => {
        toast.success("Issue assigned successfully");
        getIssue();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const handleClose = () => {
    axios
      .post(`issues/${issue?.id}/close`)
      .then((res) => {
        toast.success("Issue closed successfully");
        getIssue();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <Stack p={2} spacing={1}>
      <Typography variant="h6" align="center">
        Review Issue
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={2}>
          <Autocomplete
            fullWidth
            options={users}
            getOptionLabel={(option) =>
              option.firstname + " " + option.lastname
            }
            autoHighlight={true}
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                required
                fullWidth
                label="Assignee"
                placeholder="Assignee"
              />
            )}
          />
          <Button sx={{ px: 2 }} type="submit" variant="contained">
            Assign
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenClose(true)}
          >
            Close
          </Button>
        </Stack>
        <AlertDialog
          open={openAssign}
          setOpen={setOpenAssign}
          handle={handleAssign}
          title="Assign Issue"
          color="primary"
          label="Assign"
          description="Are you sure you want to assign issue to the slected user? this process is irreversible"
        />
        <AlertDialog
          open={openClose}
          setOpen={setOpenClose}
          handle={handleClose}
          title="Close Issue"
          color="error"
          label="Close"
          description="Are you sure you want to close this issue? this process is irreversible"
        />
      </form>
    </Stack>
  );
}

export default ReviewIssue;
