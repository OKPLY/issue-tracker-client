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
import { useNavigate, useParams } from "react-router-dom";
import humanize from "humanize-string";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [name, setName] = React.useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  useEffect(() => {
    if (!roles?.length || !user?.roles?.length) {
      setSelectedRoles([]);
      return;
    }

    setSelectedRoles(
      roles.filter((p) => user.roles.some((rp) => rp.id === p.id))
    );
  }, [roles, user]);

  const getUser = () => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const getRoles = () => {
    axios
      .get(`/roles`)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .post(
        `/users/setRole/${user.id}`,
        selectedRoles.map((p) => p.id)
      )
      .then((res) => {
        toast.success("User Roles updated successfully");
        navigate("/admin/users");
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
                Edit User Roles
              </Typography>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="First Name"
                  size="small"
                  fullWidth
                  value={user?.firstname ?? ""}
                  readOnly
                />

                <TextField
                  label="Last Name"
                  size="small"
                  fullWidth
                  value={user?.lastname ?? ""}
                  readOnly
                />
              </Stack>

              <TextField
                label="Email Address"
                size="small"
                fullWidth
                value={user?.email ?? ""}
                readOnly
              />

              <Autocomplete
                disableCloseOnSelect
                multiple
                fullWidth
                id="permissions"
                options={roles}
                getOptionLabel={(option) => humanize(option.name)}
                autoHighlight={true}
                value={selectedRoles}
                onChange={(event, newValue) => {
                  setSelectedRoles(newValue);
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
                Update Roles
              </Button>
            </Stack>
          </Paper>
        </form>
      </Box>
    </div>
  );
}

export default EditUser;
