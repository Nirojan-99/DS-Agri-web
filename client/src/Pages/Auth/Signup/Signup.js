import {
  Paper,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  Button,
  Avatar,
  Container,
} from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header";
import AgriSnakbar from "../../Utils/AgriSnackbar";
import { login } from "../../../Store/auth";
import Alert from "../../../Components/Alert";

export default function SignUp(props) {
  //data
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  //input darta
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //close snackbar
  const closeHandler = () => {
    setOpen(false);
  };

  //submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    //validation
    if (!FName.trim() || !LName.trim()) {
      setError("Name Required");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Invalid Email ID");
      return;
    }
    if (!password.trim()) {
      setError("Password Required");
      return;
    }
    if (
      !mobile.trim() ||
      isNaN(mobile) ||
      mobile.length > 10 ||
      mobile.length < 9
    ) {
      setError("Invalid Mobile Number");
      return;
    }

    axios
      .post("http://localhost:5000/user/register", {
        firstName: FName,
        lastName: LName,
        email: email,
        password: password,
        mobile_number: mobile,
      })
      .then((res) => {
        dispatch(
          login({
            type: res.data.type,
            id: res.data._id,
            token: res.data.token,
          })
        );
        navigate("/dashboard", { replace: true });
      })
      .catch((er) => {
        setOpen(true);
      });
  };

  //close alert
  const handleClose = () => {
    setError("");
  };

  return (
    <>
      <Alert
        handleClose={handleClose}
        title="Alert!"
        open={error}
        msg={error}
      />
      <AgriSnakbar
        msg={"Unable to create Account"}
        open={open}
        handler={closeHandler}
      />
      <Header mode={props.mode} handler={props.handler} />
      <Box minHeight={"83vh"} component="div">
        <Paper square elevation={0}>
          <Container component="main" maxWidth="xs" color="primary">
            <Box
              pb={3}
              component={"paper"}
              sx={{
                minHeight: "83vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, mt: 5, bgcolor: "secondary.main" }}>
                <AgricultureIcon fontSize="medium" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
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
                      value={FName}
                      onChange={(event) => {
                        setFName(event.target.value);
                      }}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      value={LName}
                      onChange={(event) => {
                        setLName(event.target.value);
                      }}
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
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
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
                      value={mobile}
                      onChange={(event) => {
                        setMobile(event.target.value);
                      }}
                      fullWidth
                      id="mobile-number"
                      label="mobile number"
                      name="mobile-number"
                      type="number"
                      autoComplete="mobile-number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
    </>
  );
}
