import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(props.mode);

  let history = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  props.handler(mode);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const profilehandler = () => {
    history("/profile");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color={"primary"} position="sticky">
          <Toolbar>
            <Button href="/">
              <img alt="Agri logo" src={logo} width="50px" />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
            <Tooltip title={mode === "dark" ? "light theme" : "dark theme"}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
                onClick={() => {
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                  props.handler(mode);
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon fontSize="inherit" />
                ) : (
                  <LightModeIcon fontSize="inherit" />
                )}
              </IconButton>
            </Tooltip>

            {!auth && (
              <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                <Button href="/login" key={"login"} sx={{ color: "#eee" }}>
                  Log In
                </Button>
                <Button href="/signup" key={"signup"} sx={{ color: "#eee" }}>
                  Sign up
                </Button>
              </Box>
            )}

            {/*user profile*/}
            {auth && (
              <div>
                <Tooltip title={"cart"}>
                  <IconButton href="/cart" size="large" color="inherit">
                    <Badge badgeContent={1} color="error">
                      <ShoppingCartIcon fontSize="inherit" />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Favorites"}>
                  <IconButton href="/favorites" size="large" color="inherit">
                    <FavoriteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="profile">
                  <IconButton size="large" onClick={handleMenu} color="inherit">
                    <AccountCircle fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Menu
                  color="#e28743"
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={profilehandler}>Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAuth(false);
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
    </>
  );
}

export default Header;
