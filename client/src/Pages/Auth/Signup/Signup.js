import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../../Components/Header";
import { Paper } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import axios from "axios";
import AgriSnakbar from "../../Utils/AgriSnackbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeHandler = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("http://localhost:5000/user/register", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        mobile_number: data.get("mobile-number"),
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

  return (
    <>
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
                      type="number"
                      autoComplete="mobile-number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
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
