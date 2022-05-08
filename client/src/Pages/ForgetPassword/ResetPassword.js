import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Alert from "../../Components/Alert";

function ResetPassword(props) {
  //data
  const [newPassword, setNewPassword] = useState();
  const [reTypePassword, setReTypePassword] = useState();
  const [error, setError] = useState("");

  //hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //useeffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/password/${id}`)
      .then((res) => {
        if (!res.data.found) {
          navigate("login", { replace: true });
        }
      })
      .catch((er) => {
        navigate("login", { replace: true });
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!newPassword.trim() || !reTypePassword.trim()) {
      setError("Passwords required");
      return;
    }
    if (newPassword !== reTypePassword) {
      setError("Passwords did not match");
      return;
    }

    axios
      .post(`http://localhost:5000/users/password/${id}`, {
        password: newPassword,
      })
      .then((res) => {
        navigate("/login", { replace: true });
      })
      .catch((er) => {});
  };

  return (
    <>
      <Alert
        open={error}
        msg={error}
        title={"Alert"}
        handleClose={() => {
          setError(false);
        }}
      />
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
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New Password"
              name="newpassword"
              autoFocus
              type="password"
              valuse={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passRE"
              label="Re-type Password"
              type="password"
              value={reTypePassword}
              onChange={(event) => {
                setReTypePassword(event.target.value);
              }}
            />

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

export default ResetPassword;
