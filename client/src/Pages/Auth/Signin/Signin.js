import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Header from "../../../Components/Header";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/auth";
import Alert from "../../../Components/Alert";

import axios from "axios";
import AgriSnackbar from "../../Utils/AgriSnackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function SignInSide(props) {
  //data
  const [snack, setSnack] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //error display
  const handleClose = () => {
    setSnack(false);
  };

  //login submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setError("Invalid Email");
      return;
    }
    if (!password.trim()) {
      setError("Password Required");
      return;
    }

    axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(
          login({
            role: res.data.type,
            userID: res.data._id,
            token: res.data.token,
          })
        );
        navigate("/dashboard", { replace: true });
      })
      .catch((er) => {
        setSnack(true);
      });
  };

  //close alert msg
  const handleCloseAlert = () => {
    setError("");
  };

  return (
    <>
      <Alert
        open={error}
        handleClose={handleCloseAlert}
        title="Alert"
        msg={error}
      />
      <AgriSnackbar open={snack} msg={"Login Failure"} handler={handleClose} />
      <Header mode={props.mode} handler={props.handler} />
      <Grid container sx={{ height: "83vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2016/09/21/04/46/barley-field-1684052__480.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AgricultureIcon fontSize="medium" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                id="email"
                label="Email ID"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs sx={{ textAlign: "left" }}>
                  <Link href="/forget-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
