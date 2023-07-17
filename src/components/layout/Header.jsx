import AccountCircle from "@mui/icons-material/AccountCircle";
import { Container } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
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

export default function Header({ title }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div style={{ height: 60 }}>
      <AppBar
        position="fixed"
        open={true}
        sx={{
          bgcolor: "#2d3e83",
          boxShadow: "none",
          borderBottomLeftRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" fontSize={18}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              to="/account"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <IconButton size="large" edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
              <Typography variant="button" ml={0.5}>
                {"Maggie"}
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
