import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Container,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const settings = ["Profile", "Logout"];

export default function Header({ title }) {
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  useEffect(() => {
    handleLogout();
  }, [localStorage.getItem("token")]);
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  const navigate = useNavigate();

  const handleSettingLink = (setting) => {
    setting == "Profile" ? navigate("/account") : handleLogout();
    setAnchorElUser(null);
  };
  const [anchorElUser, setAnchorElUser] = useState(null);
  return (
    <AppBar
      position="fixed"
      open={true}
      sx={{
        display: "flex",
        bgcolor: "#2d3e83",
        boxShadow: "none",
        borderBottomLeftRadius: "10px",
        marginBottom: "20px",
        height: 60,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" fontSize={18}>
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleSettingLink(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
