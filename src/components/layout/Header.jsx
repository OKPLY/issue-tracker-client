import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate } from "../../contexts/AuthContext";

const settings = ["Profile", "Logout"];

function Header({ title }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const authUpdate = useAuthUpdate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    authUpdate(null);
    navigate("/signin");
  };

  const handleSettingLink = (setting) => {
    setting == "Profile" ? navigate("/account") : handleLogout();
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          bgcolor: "#2d3e83",
          boxShadow: "none",
          height: 60,
        }}
      >
        <Container maxWidth="xl" width={"100%"}>
          <Toolbar disableGutters style={{ minHeight: 60 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            </Box>

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
                onClose={handleCloseUserMenu}
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
        </Container>
        <Box>
          <Box height={20} bgcolor="#2d3e83">
            <Box
              height={20}
              sx={{ borderTopLeftRadius: "10px" }}
              bgcolor="white"
            ></Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
export default Header;
