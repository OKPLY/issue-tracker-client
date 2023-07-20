import React, { useEffect } from "react";
import axios from "../../config/axiosConfig";
import { Stack } from "@mui/system";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { STATUS } from "../../util/constants";

const initialState = {
  status: "",
  tagId: "",
  typeId: "",
  text: "",
};

function FilterCard({ state, setState, hideStatus }) {
  const [tags, setTags] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState(null);

  useEffect(() => {
    axios.get("/tags").then((res) => {
      setTags(res.data);
    });

    axios.get("/types").then((res) => {
      setTypes(res.data);
    });
  }, []);

  useEffect(() => {
    setState(initialState);
  }, []);

  return (
    <Paper sx={{ marginX: 4 }}>
      <Stack direction={"row"} p={2} spacing={2}>
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
      </Stack>
    </Paper>
  );
}

export default FilterCard;
