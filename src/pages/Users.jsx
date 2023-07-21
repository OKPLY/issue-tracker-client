import React from "react";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import Header from "../components/layout/Header";
import humanizeString from "humanize-string";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID" },
  { width: 150, field: "firstname", headerName: "First Name" },
  { width: 150, field: "lastname", headerName: "Last Name" },
  { width: 250, field: "email", headerName: "Email Address" },
  { width: 250, field: "createdAt", headerName: "Created At" },
  {
    width: 150,
    field: "roles",
    headerName: "Roles",
    renderCell: (params) => (
      <Link to={`/admin/users/${params?.row?.id}`}>
        <Button variant="contained">Edit Roles</Button>
      </Link>
    ),
  },
];

function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message ?? "Something went wrong")
      );
  };

  return (
    <>
      <Header title={"Users"} />
      <Stack p={4} pt={2} spacing={2}>
        <Typography variant="h6" align="center">
          System Users
        </Typography>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
          disableRowSelectionOnClick
        />
      </Stack>
    </>
  );
}

export default Users;
