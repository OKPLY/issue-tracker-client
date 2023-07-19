import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Header from "./layout/Header";
import { Menu, MoreVert, MoreVertOutlined } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";

const tasks = [
  { id: "1", title: "First issue", content: "jhb zdoai usbzdcb ujbx" },
  { id: "2", title: "Second issue", content: "" },
  {
    id: "3",
    title: "Third issue",
    content: "lore  hszb hjbhs ajhb zdoai usbzdcb ujbx",
  },
  {
    id: "4",
    title: "Fourth issue",
    content: "lore ipsum son das hbz hjb hszb hjbhs ajhb zdoai usbzdcb ujbx",
  },
  {
    id: "5",
    title: "Fifth issue",
    content: "lore ipsum son das hbz hjb hszb hjbhs ajhb zdoai usbzdcb ujbx",
  },
];

const taskStatus = {
  inProgress: {
    name: "In Progress",
    items: tasks,
  },

  toDo: {
    name: "Resolved",
    items: [],
  },

  done: {
    name: "Closed",
    items: [],
  },
  stale: {
    name: "Stale",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function IssueStatusTracker() {
  const [columns, setColumns] = useState(taskStatus);
  return (
    <div>
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
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
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
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
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
                                            {item.content}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                          <IconButton>
                                            <MoreVertOutlined />
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    </Box>
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
