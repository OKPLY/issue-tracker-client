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
import TagCard from "../components/tag/TagCard";
import axios from "../config/axiosConfig";

function Tags() {
  const [name, setName] = React.useState("");
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios
      .get(`/tags`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/tags`, { name })
      .then((res) => {
        toast.success("Tag added successfully");
        getTags();
        setName("");
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  return (
    <>
      <Header title="Tags" />

      <Grid container spacing={4} p={4}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Paper>
              <Stack spacing={2} p={4}>
                <Typography variant="h6" align="center">
                  Add New Tag
                </Typography>

                <TextField
                  label="Name"
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button fullWidth variant="contained" type="submit">
                  Add Tag
                </Button>
              </Stack>
            </Paper>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {tags?.map((tag) => (
              <TagCard tag={tag} getTags={getTags} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Tags;
