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
  Typography,
} from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ImageModal from "../../Utils/ImageModal";
import { useState } from "react";

function Account() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
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
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
