import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import axios from "../config/axiosConfig";
import { Close, Filter } from "@mui/icons-material";
import { toast } from "react-toastify";
import SelectImagesComponent from "../components/images/SelectImagesComponent";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import handleUpload from "../util/uploadFile";
import NewCommentCard from "../components/comment/NewCommentCard";
import { useAuth } from "../contexts/AuthContext";
import { PERMISSION } from "../util/constants";

const initialState = () => ({
  title: "",
  description: "",
});

function NewIssue() {
  const auth = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [state, setState] = React.useState(initialState);
  const [tags, setTags] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const issueId = searchParams.get("issueId");

  useEffect(() => {
    axios.get("/tags").then((res) => {
      setTags(res.data);
    });

    axios.get("/types").then((res) => {
      setTypes(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const data = {
      ...state,
      tags: selectedTags.map((tag) => ({ id: tag.id })),
      attachments: [],
    };

    if (selectedType?.id) {
      data.type = { id: selectedType.id };
    }

    if (selectedImages?.length == 0) submit(data);

    for (var i = 0; i < selectedImages.length; i++) {
      handleUpload(
        selectedImages[i].file,
        () => {},
        (url) => {
          data.attachments.push({ url: url });

          if (selectedImages.length == data.attachments.length) submit(data);
        }
      );
    }
  };

  const submit = (data) => {
    var route = "/issues";

    if (issueId) {
      route = `/issues/${issueId}/issues`;
    }

    axios
      .post(route, data)
      .then((res) => {
        toast.success("Issue created successfully");
        setState(initialState());
        setSelectedImages([]);
        setSelectedTags([]);
        setSelectedType(null);
        navigate("/issues/" + res?.data?.id);
      })
      .catch((err) => {
        toast.error("Error creating issue");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header title={issueId ? "Create Related Issue" : "Create New Issue"} />

      <Backdrop open={isLoading} sx={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" padding={4} spacing={4}>
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography variant="h6" align="center">
                  Issue Details
                </Typography>
                <TextField
                  required
                  fullWidth
                  label="Issue Title"
                  name="title"
                  autoFocus
                  value={state.title}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  minRows={6}
                  maxRows={12}
                  value={state.description}
                  onChange={handleChange}
                />
                <Autocomplete
                  multiple
                  id="tags"
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  autoHighlight={true}
                  value={selectedTags}
                  onChange={(event, newValue) => {
                    setSelectedTags(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required={selectedTags?.length === 0}
                      label="Tags"
                      placeholder="Tags"
                    />
                  )}
                />

                <Autocomplete
                  id="types"
                  required
                  options={types}
                  getOptionLabel={(option) => option.name}
                  autoHighlight={true}
                  value={selectedType}
                  onChange={(event, newValue) => {
                    setSelectedType(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Issue Type"
                      placeholder="Issue Type"
                    />
                  )}
                />
              </Stack>
            </Paper>
          </Grid>
          {auth?.permissions?.includes(PERMISSION.CreateAttachment) && (
            <Grid item xs={12} md={8} lg={6}>
              <Paper elevation={2} sx={{ p: 4 }}>
                <SelectImagesComponent
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              Create Issue
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default NewIssue;
