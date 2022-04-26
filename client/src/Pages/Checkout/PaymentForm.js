import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Button,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const CardPayment = (props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            required
            id="expDate"
            label="Expiry year"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            required
            id="expDate"
            label="Expiry month"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
};
const MobilePayment = (props) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="mobileNo"
            label="mobile Number"
            fullWidth
            type="tel"
            autoComplete="mobile"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default function PaymentForm(props) {
  const [method, setMethod] = useState("card");

  const methodHandler = (event) => {
    setMethod(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, color: "#62BB46" }}>
        Payment method
      </Typography>
      <RadioGroup value={method} onChange={methodHandler} row sx={{ mb: 2 }}>
        <FormControlLabel
          value="card"
          control={<Radio />}
          label="Card Payment"
        />
        <FormControlLabel
          value="mobile"
          control={<Radio />}
          label="Add to Mobile"
        />
      </RadioGroup>
      {method === "card" ? <CardPayment /> : <MobilePayment />}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button
          variant="contained"
          onClick={props.handleNext}
          sx={{
            mt: 3,
            ml: 1,
            "&:hover": { bgcolor: "#333", color: "#fff" },
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
