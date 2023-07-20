import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import sidebarMenus from "../../util/sidebarMenus";
import ListItemLink from "./ListItemLink";
import SideBarMenuSingle from "./SideBarMenuSingle";
import { ArrowBackIosNew, Menu } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const drawerWidth = 265;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  marginTop: "2px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({}) {
  const user = useAuth();
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawerOpen = () => setOpenDrawer((prev) => !prev);
  const theme = useTheme();
  const { pathname } = useLocation();
  const [openIndex, setOpenIndex] = useState(-1);
  const [menus, setMenus] = useState([]);

  useEffect(() => setMenus(sidebarMenus(user)), [user]);

  return (
    <Drawer
      variant="permanent"
      open={openDrawer}
      PaperProps={{
        sx: {
          background: "#2D3E83",
          color: "#FFFFFF",
          border: "unset",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginY: 2,
        }}
      >
        <IconButton
          onClick={handleDrawerOpen}
          sx={{ padding: 1, marginLeft: 1 }}
        >
          {openDrawer ? (
            <ArrowBackIosNew sx={{ color: "#fff" }} />
          ) : (
            <Menu sx={{ color: "#fff" }} />
          )}
        </IconButton>

        <Typography sx={{ padding: 0.5 }} variant="h6">
          Issue Tracker
        </Typography>
      </Stack>

      <List style={{ height: "100%" }}>
        <Stack justifyContent={"space-between"} style={{ height: "100%" }}>
          <div className="flex flex-col h-full justify-between">
            <div>
              {menus?.map((obj, index) =>
                obj.hasChildren ? (
                  obj.permission && (
                    <div key={obj.label}>
                      <ListItemButton
                        onClick={() => {
                          setOpenIndex(openIndex == index ? -1 : index);
                        }}
                        sx={{ paddingLeft: 2 }}
                      >
                        <ListItemIcon>
                          <div
                            style={{
                              color: "#FFFFFF",
                            }}
                          >
                            {obj.icon}
                          </div>
                        </ListItemIcon>
                        <ListItemText primary={obj.label} />
                        {openIndex == index ? (
                          <ExpandLess color="#FFFFFF" />
                        ) : (
                          <ExpandMore color="#FFFFFF" />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={openIndex == index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" sx={{ paddingLeft: 2 }}>
                          {obj.children?.map((obj2, index) => (
                            <SideBarMenuSingle key={index} menu={obj2} />
                          ))}
                        </List>
                      </Collapse>
                    </div>
                  )
                ) : (
                  <SideBarMenuSingle key={obj.label} menu={obj} />
                )
              )}
            </div>
          </div>
        </Stack>
      </List>
    </Drawer>
  );
}
