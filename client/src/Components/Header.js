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
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { dark, light } from "../Store/theme";

import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/auth";
import axios from "axios";
import { useEffect } from "react";

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const Tmode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();
  const { token, role, userID } = useSelector((state) => state.loging);
  const [mode, setMode] = useState(Tmode);
  const [auth, setAuth] = useState(token);
  const [cart, setcart] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/carts?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setcart(res.data.length);
      });
  }, []);

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
              <Typography
                variant="h3"
                sx={{
                  textTransform: "none",
                  ml: 2,
                  fontSize: { xs: 14, sm: 25 },
                }}
              >
                AgriGo
              </Typography>
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
            <Tooltip title={mode === "dark" ? "light theme" : "dark theme"}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                  if (Tmode === "light") {
                    dispatch(dark());
                  } else {
                    dispatch(light());
                  }
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
                {role === "client" && (
                  <Tooltip title={"cart"}>
                    <IconButton href="/cart" size="large" color="inherit">
                      <Badge badgeContent={cart} color="error">
                        <ShoppingCartIcon fontSize="inherit" />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                )}
                {role === "client" && (
                  <Tooltip title={"Favorites"}>
                    <IconButton href="/favorites" size="large" color="inherit">
                      <FavoriteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                )}

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
                      setAuth(null);
                      dispatch(logout());
                      history("/login", { replace: true });
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
