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
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PaymentForm(props) {
  const [method, setMethod] = useState("card");

  const [nameOn, setNameOn] = useState();
  const [cardNum, setCardNum] = useState();
  const [ExMonth, setExMonth] = useState();
  const [ExYear, setExYear] = useState();
  const [mobile, setMobile] = useState();
  const [cvv, setCvv] = useState();

  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:5000/api/payment`,
        {
          user_id: userID,
          order_id: props.id,
          amount: amount,
          method: method,
          mobile_number: mobile,
          card_number: cardNum,
          expiry_year: ExYear,
          expiry_month: ExMonth,
          cvv,
          name_on_card: nameOn,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        props.handleNext();
      })
      .catch((er) => {});
  };

  const { token, userID } = useSelector((state) => state.loging);

  const [isFilled, setFilled] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payment?order_id=${props.id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data.exist) {
          setFilled("true");
        }
      })
      .catch((er) => {});
    axios
      .get(`http://localhost:5000/api/order?_id=${props.id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setAmount(res.data.total);
      })
      .catch((er) => {});
  }, []);

  const methodHandler = (event) => {
    setMethod(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, color: "#62BB46" }}>
        Payment method
      </Typography>
      <RadioGroup
        disabled={isFilled}
        value={method}
        onChange={methodHandler}
        row
        sx={{ mb: 2 }}
      >
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
      {method === "card" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              value={nameOn}
              onChange={(event) => {
                setNameOn(event.target.value);
              }}
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="outlined"
              disabled={isFilled}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              value={cardNum}
              onChange={(event) => {
                setCardNum(event.target.value);
              }}
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="outlined"
              type="number"
              disabled={isFilled}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              required
              value={ExYear}
              onChange={(event) => {
                setExYear(event.target.value);
              }}
              id="expDate"
              label="Expiry year"
              fullWidth
              autoComplete="cc-exp"
              variant="outlined"
              disabled={isFilled}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              value={ExMonth}
              onChange={(event) => {
                setExMonth(event.target.value);
              }}
              required
              id="expDate"
              label="Expiry month"
              fullWidth
              autoComplete="cc-exp"
              variant="outlined"
              disabled={isFilled}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={cvv}
              onChange={(event) => {
                setCvv(event.target.value);
              }}
              required
              id="cvv"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
              variant="outlined"
              disabled={isFilled}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              disabled={isFilled}
              id="mobileNo"
              label="mobile Number"
              fullWidth
              type="tel"
              autoComplete="mobile"
              variant="outlined"
            />
          </Grid>
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {!isFilled && (
          <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}

        <Button
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
    </>
  );
}
