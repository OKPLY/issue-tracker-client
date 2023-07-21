import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Header from "./layout/Header";
import { MoreVertOutlined } from "@mui/icons-material";
import { STATUS } from "../util/constants";
import ReviewIssue from "./issue/ReviewIssue";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router";

const onDragEnd = async (result, columns, setColumns, setIsDragable) => {
  if (!result.destination) return;
  const { source, destination, draggableId } = result;
  const sourceColumn = columns[source.droppableId];
  const destinationColumn = columns[destination.droppableId];
  if (
    sourceColumn.name === STATUS.CREATED &&
    destinationColumn.name !== STATUS.ASSIGNED &&
    destinationColumn.name !== STATUS.CLOSED
  ) {
    return;
  }

  if (
    sourceColumn.name === STATUS.ASSIGNED &&
    destinationColumn.name !== STATUS.RESOLVED
  ) {
    return;
  }

  if (
    sourceColumn.name === STATUS.RESOLVED &&
    destinationColumn.name !== STATUS.CLOSED
  ) {
    return;
  }

  // Get the draggable item from the source column

  if (destination.droppableId === "assigned") {
    setIsDragable(true);
    return;
  }

  const draggable = sourceColumn.items.find(
    (item) => item.id === parseInt(draggableId)
  );

  const updatedColumns = { ...columns };

  // If the source and destination columns are the same
  if (source.droppableId === destination.droppableId) {
    const items = [...sourceColumn.items];
    items.splice(source.index, 1);
    items.splice(destination.index, 0, draggable);
    updatedColumns[source.droppableId].items = items;
  } else {
    // If the source and destination columns are different
    const sourceItems = [...sourceColumn.items];
    const destColumn = updatedColumns[destination.droppableId];
    const destItems = [...destColumn.items];

    sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, draggable);

    updatedColumns[source.droppableId].items = sourceItems;
    updatedColumns[destination.droppableId].items = destItems;

    // Update the issue's status in the backend
    try {
      const issueId = draggable.id;
      let endpoint = "";

      switch (destColumn.name) {
        case STATUS.RESOLVED:
          endpoint = `/issues/${issueId}/resolve`;
          break;
        case STATUS.CLOSED:
          endpoint = `/issues/${issueId}/close`;
          break;
        default:
          break;
      }

      if (endpoint) {
        const data = await axiosInstance.post(endpoint);
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  }

  setColumns(updatedColumns);
};

const issueStatus = {
  created: {
    id: 1,
    name: STATUS.CREATED,
    items: [],
  },
  assigned: {
    id: 2,
    name: STATUS.ASSIGNED,
    items: [],
  },
  resolved: {
    id: 3,
    name: STATUS.RESOLVED,
    items: [],
  },

  closed: {
    id: 4,
    name: STATUS.CLOSED,
    items: [],
  },
};

function IssueStatusTracker() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(issueStatus);
  const [isDragable, setIsDragable] = useState(false);
  const [open, setOpen] = useState(false);

  const getCreatedIssues = async () => {
    try {
      const response = await axiosInstance.get(
        `/issues/filter?status=${STATUS.CREATED}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching created issues:", error);
      return [];
    }
  };

  const getAssignedIssues = async () => {
    try {
      const response = await axiosInstance.get(
        `/issues/filter?status=${STATUS.ASSIGNED}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assigned issues:", error);
      return [];
    }
  };

  const getResolvedIssues = async () => {
    try {
      const response = await axiosInstance.get(
        `/issues/filter?status=${STATUS.RESOLVED}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assigned issues:", error);
      return [];
    }
  };
  const getClosedIssues = async () => {
    try {
      const response = await axiosInstance.get(
        `/issues/filter?status=${STATUS.CLOSED}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assigned issues:", error);
      return [];
    }
  };
  const fetchIssues = async () => {
    const createdIssues = await getCreatedIssues();
    const assignedIssues = await getAssignedIssues();
    const resolvedIssues = await getResolvedIssues();
    const closedIssues = await getClosedIssues();

    setColumns((prevColumns) => ({
      ...prevColumns,
      created: { ...prevColumns.created, items: createdIssues },
      assigned: { ...prevColumns.assigned, items: assignedIssues },
      resolved: { ...prevColumns.resolved, items: resolvedIssues },
      closed: { ...prevColumns.closed, items: closedIssues },
    }));
  };
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      {isDragable ? (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Alert
            severity="error"
            elevation={14}
            sx={{ position: "relative", m: 10 }}
            onClose={() => {
              setIsDragable(false);
            }}
          >
            Add assigne to the issue first!
          </Alert>
        </div>
      ) : (
        ""
      )}
      <Header title="Track Issue Status" />

      {/* <Typography style={{ textAlign: "center" }}>Issue Tracker</Typography> */}
      <Box
        style={{
          // backgroundColor: "#ef2344",
          display: "flex",
          justifyContent: "center",
          height: "100%",
          marginTop: 30,
        }}
      >
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns, setIsDragable);
          }}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <Paper
                  sx={{
                    m: 2,
                    bgcolor: "#f1f2f4",
                    fontFamily:
                      "apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                  }}
                >
                  <Typography sx={{ m: 1 }}>{column.name}</Typography>

                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#ebecf0"
                              : // : "#ebecf0",
                                "#f1f2f4",
                            padding: 4,
                            borderRadius: 12,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                isDragDisabled={isDragable}
                                key={item.id + ""}
                                draggableId={item.id + ""}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <>
                                      {open ? (
                                        <AlertDialog
                                          issue={item}
                                          open={open}
                                          handleClose={() => setOpen(!open)}
                                          getIssue={fetchIssues}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          border: "2px solid transparent",
                                          borderRadius: 8,
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "5px 5px 8px 5px",
                                          minHeight: "25px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#ffffff",
                                          color: "#172b4d",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Grid container spacing={1}>
                                          <Grid
                                            container
                                            onClick={() =>
                                              navigate(`/issues/${item.id}`)
                                            }
                                            xs={10}
                                          >
                                            <Grid item xs={2}>
                                              <Avatar
                                                sx={{
                                                  width: 24,
                                                  height: 24,
                                                }}
                                                alt="Maggie Sharp"
                                                src="/broken-image.jpg"
                                              />
                                            </Grid>
                                            <Grid item xs={8}>
                                              <Typography
                                                sx={{
                                                  fontSize: 14,
                                                }}
                                              >
                                                {item.title}
                                              </Typography>
                                              <Typography
                                                noWrap={true}
                                                sx={{
                                                  variant: "body2",
                                                  color: "text.secondary",
                                                  fontSize: 10,
                                                }}
                                              >
                                                {item.description}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={2}>
                                            {column.name === STATUS.CREATED ? (
                                              <IconButton
                                                onClick={() => setOpen(true)}
                                              >
                                                <MoreVertOutlined />
                                              </IconButton>
                                            ) : (
                                              ""
                                            )}
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </Paper>
              </div>
            );
          })}
        </DragDropContext>
      </Box>
    </div>
  );
}

export default IssueStatusTracker;

export function AlertDialog({ open, handleClose, issue, getIssue }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ width: 500 }}>
          <ReviewIssue issue={issue} getIssue={getIssue} hideClose />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
