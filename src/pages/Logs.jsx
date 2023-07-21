import React from "react";
import axios from "../config/axiosConfig";
import { toast } from "react-toastify";
import Header from "../components/layout/Header";
import humanizeString from "humanize-string";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const routes = {
  Issue: "issues",
  Tag: "settings/tags",
  Type: "settings/types",
  Role: "admin/roles",
};

const columns = [
  { field: "id", headerName: "ID" },
  {
    width: 200,
    field: "fullName",
    headerName: "User",
    valueGetter: (params) =>
      `${params.row?.user?.firstname || ""} ${
        params.row?.user?.lastname || ""
      }`,
  },
  {
    width: 200,
    field: "controller",
    headerName: "Controller",
    valueGetter: (params) => humanizeString(params.row?.clazz),
  },
  {
    width: 200,
    field: "action",
    headerName: "Action",
    valueGetter: (params) => humanizeString(params.row?.action),
  },
  {
    width: 180,
    field: "timeStamp",
    headerName: "Time Stamp",
    valueGetter: (params) => new Date(params.row?.createdAt).toLocaleString(),
  },

  {
    field: "changeId",
    headerName: "Target ID",
  },
  {
    width: 150,
    field: "roles",
    headerName: "Target",
    renderCell: (params) => {
      const controller = params?.row?.clazz?.split("Controller")?.at(0);
      var route = `/${routes[controller]}`;

      if (controller != "Type" && controller != "Tag" && controller != "Role")
        route += `/${params?.row?.changeId ?? ""}`;

      if (
        !params?.row?.changeId ||
        !controller ||
        String(params?.row?.action ?? "")
          ?.toLowerCase()
          ?.includes("comment")
      )
        return <div></div>;

      return (
        <Link to={route}>
          <Button>Open Target</Button>
        </Link>
      );
    },
  },
];

function Logs() {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    getLogs();
  }, []);

  const getLogs = () => {
    axios
      .get("/logs")
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message ?? "Something went wrong")
      );
  };

  return (
    <>
      <Header title={"Logs"} />
      <Stack p={4} pt={2} spacing={2}>
        <Typography variant="h6" align="center">
          System Logs
        </Typography>
        <DataGrid
          rows={logs}
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

export default Logs;
