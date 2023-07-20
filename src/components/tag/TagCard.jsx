import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import AlertDialog from "../fragments/AlertDialog";

function TagCard({ tag, getTags }) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState(tag.name);

  useEffect(() => {
    setName(tag.name);
  }, [tag]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/tags/${tag.id}`, { name })
      .then((res) => {
        toast.success("Tag updated successfully");
        getTags();
        setEditMode(false);
      })
      .catch((err) => {
        toast.error(err?.response.data.message ?? "Something went wrong");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/tags/${tag.id}`)
      .then((res) => {
        toast.success("Tag deleted successfully");
        getTags();
      })
      .catch((err) => {
        toast.error(err?.response.data.message ?? "Something went wrong");
      });
  };

  if (editMode)
    return (
      <Paper>
        <form onSubmit={handleUpdate}>
          <Stack spacing={2} p={2} direction="row">
            <TextField
              size="small"
              required
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              color="warning"
              variant="outlined"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button type="submit" color="warning" variant="contained">
              Update
            </Button>
          </Stack>
        </form>
      </Paper>
    );

  return (
    <Paper>
      <Stack spacing={2} p={2} direction="row">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {tag.name}
        </Typography>

        <Button
          color="warning"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => setOpenDelete(true)}
        >
          Delete
        </Button>
      </Stack>

      <AlertDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handle={handleDelete}
        title="Delete Tag"
        color="error"
        label="Delete"
        description="Are you sure you want to delete this tag? this process is irreversible"
      />
    </Paper>
  );
}

export default TagCard;
