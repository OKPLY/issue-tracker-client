import { Autocomplete, Paper, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { STATUS } from "../../util/constants";

const initialState = {
  status: "",
  tagId: "",
  typeId: "",
  text: "",
  creatorId: "",
  reviewerId: "",
  resolverId: "",
};

function FilterCard({ state, setState, hideStatus, showUsers }) {
  const [tags, setTags] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [creator, setCreator] = React.useState(null);
  const [reviewer, setReviewer] = React.useState(null);
  const [resolver, setResolver] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    axios.get("/tags").then((res) => {
      setTags(res.data);
    });

    axios.get("/types").then((res) => {
      setTypes(res.data);
    });

    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    setState(initialState);
  }, []);

  return (
    <Paper sx={{ marginX: 4 }}>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            placeholder="Search"
            value={state.text}
            onChange={(e) => {
              setState((prev) => ({ ...prev, text: e.target.value }));
            }}
          />

          {!hideStatus && (
            <Autocomplete
              sx={{ maxWidth: 150 }}
              fullWidth
              id="types"
              options={Object.values(STATUS)}
              getOptionLabel={(option) => option}
              autoHighlight={true}
              value={selectedStatus}
              onChange={(event, newValue) => {
                setSelectedStatus(newValue);
                setState((prev) => ({ ...prev, status: newValue ?? "" }));
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Status"
                  placeholder="Status"
                />
              )}
            />
          )}

          <Autocomplete
            sx={{ maxWidth: 250 }}
            fullWidth
            id="tags"
            options={tags}
            getOptionLabel={(option) => option.name}
            autoHighlight={true}
            value={selectedTag}
            onChange={(event, newValue) => {
              setSelectedTag(newValue);
              setState((prev) => ({ ...prev, tagId: newValue?.id ?? "" }));
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="Tag"
                placeholder="Tag"
              />
            )}
          />

          <Autocomplete
            sx={{ maxWidth: 250 }}
            fullWidth
            id="types"
            options={types}
            getOptionLabel={(option) => option.name}
            autoHighlight={true}
            value={selectedType}
            onChange={(event, newValue) => {
              setSelectedType(newValue);
              setState((prev) => ({ ...prev, typeId: newValue?.id ?? "" }));
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="Type"
                placeholder="Type"
              />
            )}
          />
        </Stack>
        {showUsers && (
          <Stack spacing={2} direction="row">
            <Autocomplete
              fullWidth
              id="creator"
              options={users}
              getOptionLabel={(option) =>
                option.firstname + " " + option.lastname
              }
              autoHighlight={true}
              value={creator}
              onChange={(event, newValue) => {
                setCreator(newValue);
                setState((prev) => ({
                  ...prev,
                  creatorId: newValue?.id ?? "",
                }));
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Created By"
                  placeholder="Created By"
                />
              )}
            />

            <Autocomplete
              fullWidth
              id="reviewer"
              options={users}
              getOptionLabel={(option) =>
                option.firstname + " " + option.lastname
              }
              autoHighlight={true}
              value={reviewer}
              onChange={(event, newValue) => {
                setReviewer(newValue);
                setState((prev) => ({
                  ...prev,
                  reviewerId: newValue?.id ?? "",
                }));
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Reviewed By"
                  placeholder="Reviewed By"
                />
              )}
            />

            <Autocomplete
              fullWidth
              id="resolver"
              options={users}
              getOptionLabel={(option) =>
                option.firstname + " " + option.lastname
              }
              autoHighlight={true}
              value={resolver}
              onChange={(event, newValue) => {
                setResolver(newValue);
                setState((prev) => ({
                  ...prev,
                  resolverId: newValue?.id ?? "",
                }));
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Resolved By"
                  placeholder="Resolved By"
                />
              )}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default FilterCard;
