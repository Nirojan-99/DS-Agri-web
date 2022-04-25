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

import axios from "axios";
import AgriSnackbar from "../../Utils/AgriSnackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInSide(props) {
  const [snack, setSnack] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setSnack(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("http://localhost:5000/user/login", {
        email: data.get("email"),
        password: data.get("password"),
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
        setSnack(true);
      });
  };

  return (
    <>
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
