import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword(props) {
  //data
  const [email, setEmail] = useState();
  const [isSent, setSent] = useState(false);
  const [OTP, setOTP] = useState("");

  //hook
  const navigate = useNavigate();

  //submit
  const submitHandler = (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }

    axios
      .post(`http://localhost:5000/users/password`, { email })
      .then((res) => {
        setSent(true);
      })
      .catch((er) => {});
  };

  //otp submit
  const otpHandler = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/users/password`, { email, OTP })
      .then((res) => {
        setTimeout(() => {
          navigate("/forget-password/" + res.data._id, { replace: true });
        }, 1000);
      })
      .catch((er) => {});
  };

  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box
        component={Paper}
        variant="elevation"
        square
        elevation={1}
        sx={{ minHeight: "81vh", display: "flex", flexDirection: "column" }}
      >
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
            Reset Pasword
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={isSent ? otpHandler : submitHandler}
            sx={{ mt: 1 }}
          >
            {!isSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email ID"
                name="email"
                autoComplete="email"
                autoFocus
                valuse={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            )}
            {isSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="OTP"
                type="password"
                id="otp"
                value={OTP}
                onChange={(event) => {
                  setOTP(event.target.value);
                }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ForgotPassword;
