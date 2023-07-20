import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import AlertDialog from "../fragments/AlertDialog";

function TypeCard({ type, getTypes }) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState(type.name);

  useEffect(() => {
    setName(type.name);
  }, [type]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/types/${type.id}`, { name })
      .then((res) => {
        toast.success("Type updated successfully");
        getTypes();
        setEditMode(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/types/${type.id}`)
      .then((res) => {
        toast.success("Type deleted successfully");
        getTypes();
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
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
          {type.name}
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
        title="Delete Type"
        color="error"
        label="Delete"
        description="Are you sure you want to delete this type? this process is irreversible"
      />
    </Paper>
  );
}

export default TypeCard;
