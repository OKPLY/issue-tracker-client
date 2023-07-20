import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { toast } from "react-toastify";
import AlertDialog from "../fragments/AlertDialog";
import { Link } from "react-router-dom";

function RoleCard({ role, getRoles }) {
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleDelete = () => {
    axios
      .delete(`/roles/${role.id}`)
      .then((res) => {
        toast.success("Role deleted successfully");
        getRoles();
      })
      .catch((err) => {
        toast.error(err?.response.data.message ?? "Something went wrong");
      });
  };

  return (
    <Paper>
      <Stack spacing={2} p={2} direction="row">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {role.name}
        </Typography>

        <Link to={`/admin/roles/${role.id}`}>
          <Button color="warning" variant="contained">
            Edit
          </Button>
        </Link>
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
        title="Delete Role"
        color="error"
        label="Delete"
        description="Are you sure you want to delete this role? this process is irreversible"
      />
    </Paper>
  );
}

export default RoleCard;
