import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RoleCard from "../components/role/RoleCard";
import { useNavigate, useParams } from "react-router-dom";
import humanize from "humanize-string";

function EditRole() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [role, setRole] = useState([]);
  const [name, setName] = React.useState("");
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    getRole();
    getPermissions();
  }, []);

  useEffect(() => {
    if (!permissions?.length || !role?.permissions?.length) {
      setSelectedPermissions([]);
      return;
    }

    setSelectedPermissions(
      permissions.filter((p) => role.permissions.some((rp) => rp.id === p.id))
    );

    setName(role.name);
  }, [permissions, role]);

  const getRole = () => {
    axios
      .get(`/roles/${id}`)
      .then((res) => {
        setRole(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const getPermissions = () => {
    axios
      .get(`/permissions`)
      .then((res) => {
        setPermissions(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`/roles/${role.id}`, {
        name,
        permissionIds: selectedPermissions.map((p) => p.id),
      })
      .then((res) => {
        toast.success("Role updated successfully");
        navigate("/admin/roles");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <div>
      <Header title="Role" />

      <Box p={4}>
        <form onSubmit={handleUpdate}>
          <Paper>
            <Stack spacing={4} p={4}>
              <Typography variant="h6" align="center">
                Edit Role
              </Typography>

              <TextField
                label="Name"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Autocomplete
                disableCloseOnSelect
                multiple
                fullWidth
                id="permissions"
                options={permissions}
                getOptionLabel={(option) => humanize(option.name)}
                autoHighlight={true}
                value={selectedPermissions}
                onChange={(event, newValue) => {
                  setSelectedPermissions(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Permissions"
                    placeholder="Permissions"
                  />
                )}
              />

              <Button
                fullWidth
                color="warning"
                variant="contained"
                type="submit"
              >
                Update Role
              </Button>
            </Stack>
          </Paper>
        </form>
      </Box>
    </div>
  );
}

export default EditRole;
