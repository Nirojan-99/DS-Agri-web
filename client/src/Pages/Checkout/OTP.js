import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OTP(props) {
  const { userID, token } = useSelector((state) => state.loging);

  const [isFilled, setFilled] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios
    //   .put(
    //     `http://localhost:5000/api/order`,
    //     {
    //       address,
    //       city,
    //       province,
    //       postalcode,
    //       country,
    //       _id: props.id,
    //     },
    //     {
    //       headers: { Authorization: "Agriuservalidation " + token },
    //     }
    //   )
    //   .then((res) => {
    //     // navigate(`/checkout/${res.data._id}`, { replace: true });
    //     props.handleNext();
    //   })
    //   .catch((er) => {});
  };
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ color: "#62BB46", mb: 2 }}>
        OTP verification
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            required
            inputProps={{ sx: { color: "#62BB46" } }}
            autoFocus
            id="firstName"
            placeholder="First name"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={isFilled ? props.handleNext : handleSubmit}
              sx={{
                mt: 3,
                ml: 1,
                "&:hover": { bgcolor: "#333", color: "#fff" },
              }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
