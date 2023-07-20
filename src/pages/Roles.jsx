import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RoleCard from "../components/role/RoleCard";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = React.useState("");

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    axios
      .get("/roles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/roles`, { name, permissionIds: [] })
      .then((res) => {
        toast.success("Role added successfully");
        getRoles();
        setName("");
      })
      .catch((err) => {
        toast.error(err?.response.data.message ?? "Something went wrong");
      });
  };

  return (
    <div>
      <Header title="Roles" />

      <Grid container spacing={4} p={4}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Paper>
              <Stack spacing={2} p={4}>
                <Typography variant="h6" align="center">
                  Add New Role
                </Typography>

                <TextField
                  label="Name"
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button fullWidth variant="contained" type="submit">
                  Add Role
                </Button>
              </Stack>
            </Paper>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h6" align="center">
              Roles
            </Typography>
            {roles?.map((role) => (
              <RoleCard role={role} getRoles={getRoles} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default Roles;
