import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ImageModal from "../../Utils/ImageModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AgriSnackbar from "../../Utils/AgriSnackbar";

function Account() {
  const [open, setOpen] = useState(false);
  const [Sopen, setSOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSClose = () => setSOpen(false);

  const [firstname, setFName] = useState("");
  const [lastName, setlName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ReNewPassword, setReNewPassword] = useState("");

  const { token, userID } = useSelector((state) => state.loging);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user?ID=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setFName(res.data.firstName);
        setlName(res.data.lastName);
        setEmail(res.data.email);
        setNumber(res.data.mobile_number);
        setAddress(res.data.address && res.data.address);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number.length !== 10 && number.length !== 9) {
      return;
    }
    axios
      .put(
        "http://localhost:5000/user",
        {
          firstName: firstname,
          lastName,
          address,
          mobile_number: number,
          _id: userID,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((er) => {
        setMsg("Unable to Upadate");
        setSOpen(true);
      });
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    if (newPassword !== ReNewPassword) {
      setMsg("Passwords did not match");
      setSOpen(true);
      return;
    }
    axios
      .put(
        "http://localhost:5000/user",
        { password, newPassword, _id: userID },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        setMsg("Password updated");
        setSOpen(true);
        setPassword("");
        setNewPassword("");
        setReNewPassword("");
      })
      .catch(() => {
        setMsg("Unable to Upadate");
        setSOpen(true);
      });
  };

  return (
    <>
      <AgriSnackbar open={Sopen} handler={handleSClose} msg={msg} />
      <ImageModal open={open} handleClose={handleClose} />
      <Box p={2} m={0} component={Paper} elevation={2} square>
        <Container maxWidth="sm">
          <Box
            pb={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Tooltip title="change image">
                  <IconButton
                    onClick={handleOpen}
                    sx={{
                      bgcolor: "#62BB46",
                      "&:hover": { bgcolor: "#333", color: "#fff" },
                    }}
                  >
                    <CollectionsOutlinedIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <Avatar
                src=""
                sx={{ height: 100, width: 100, border: "1px solid #333" }}
              >
                <PersonOutlineOutlinedIcon />
              </Avatar>
            </Badge>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={firstname}
                  onChange={(event) => {
                    setFName(event.target.value);
                  }}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputProps={{ sx: { color: "#62BB46" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  inputProps={{ sx: { color: "#62BB46" } }}
                  value={lastName}
                  onChange={(event) => {
                    setlName(event.target.value);
                  }}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  contentEditable={false}
                  required
                  fullWidth
                  inputProps={{ sx: { color: "#62BB46" } }}
                  value={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{ sx: { color: "#62BB46" } }}
                  value={number}
                  onChange={(event) => {
                    setNumber(event.target.value);
                  }}
                  id="mobile-number"
                  label="mobile number"
                  name="mobile-number"
                  type="tel"
                  autoComplete="mobile-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{ sx: { color: "#62BB46" } }}
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                  name="address"
                  label="address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                "&:hover": { bgcolor: "#333", color: "#fff" },
              }}
            >
              Save Changes
            </Button>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitPassword}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  name="current-password"
                  label="current password"
                  type="password"
                  id="current-password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                  name="new-password"
                  label="new password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={ReNewPassword}
                  onChange={(event) => {
                    setReNewPassword(event.target.value);
                  }}
                  name="new-password"
                  label="re-type Password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                "&:hover": { bgcolor: "#333", color: "#fff" },
              }}
            >
              Change Password
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Account;
