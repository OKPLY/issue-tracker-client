import React from "react";
import Header from "../components/layout/Header";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { type } from "@testing-library/user-event/dist/type";
import TypeCard from "../components/type/TypeCard";
import axios from "../config/axiosConfig";

function Types() {
  const [name, setName] = React.useState("");
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
    getTypes();
  }, []);

  const getTypes = () => {
    axios
      .get(`/types`)
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/types`, { name })
      .then((res) => {
        toast.success("Type added successfully");
        getTypes();
        setName("");
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  return (
    <>
      <Header title="Types" />

      <Grid container spacing={4} p={4}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Paper>
              <Stack spacing={2} p={4}>
                <Typography variant="h6" align="center">
                  Add New Type
                </Typography>

                <TextField
                  label="Name"
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button fullWidth variant="contained" type="submit">
                  Add Type
                </Button>
              </Stack>
            </Paper>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {types?.map((type) => (
              <TypeCard type={type} getTypes={getTypes} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Types;
