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
import Alert from "../../Components/Alert";
import StripeCheckout from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function PaymentForm(props) {
  //data
  const [method, setMethod] = useState("card");
  const [mobile, setMobile] = useState();
  const [amount, setAmount] = useState(0);
  const [isFilled, setFilled] = useState(false);
  const [order_id, setOID] = useState();

  //error indicator
  const [error, setError] = useState("");

  // user data
  const { token: tokenU, userID } = useSelector((state) => state.loging);
  //hooks
  const navigate = useNavigate();

  //submit card payment
  const handleSubmit = (token) => {
    axios
      .post(
        `http://localhost:5000/api/payments`,
        {
          user_id: userID,
          order_id: props.id,
          amount: amount,
          method: method,
          token,
        },
        {
          headers: { Authorization: "Agriuservalidation " + tokenU },
        }
      )
      .then((res) => {
        if (res.data) {
          //delete cart and display success
          toast("payment is success", { type: "success" });
          axios
            .patch(
              `http://localhost:5000/users/carts?_id=${userID}`,
              {},
              {
                headers: { Authorization: "Agriuservalidation " + tokenU },
              }
            )
            .then((res) => {
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 2000);
            })
            .catch((er) => {});
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  //submit mobile payment
  const mobilehandleSubmit = () => {
    if (method === "mobile") {
      if (isNaN(mobile) || mobile.length > 10 || mobile.length < 9) {
        setError("Invalid Mobile number");
        return;
      }
    }

    axios
      .post(
        `http://localhost:5000/api/payments`,
        {
          user_id: userID,
          order_id: props.id,
          amount: amount,
          method: method,
          mobile_number: mobile,
        },
        {
          headers: { Authorization: "Agriuservalidation " + tokenU },
        }
      )
      .then((res) => {
        props.handleNext();
      })
      .catch((er) => {
        console.log(er)
      });
  };

  //useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payments?order_id=${props.id}`, {
        headers: { Authorization: "Agriuservalidation " + tokenU },
      })
      .then((res) => {
        if (res.data.exist) {
          setFilled("true");
        }
      })
      .catch((er) => {});
    axios
      .get(`http://localhost:5000/api/orders?_id=${props.id}`, {
        headers: { Authorization: "Agriuservalidation " + tokenU },
      })
      .then((res) => {
        setAmount(res.data.total);
        setOID(res.data._id);
      })
      .catch((er) => {});
  }, []);

  //payment method handler
  const methodHandler = (event) => {
    setMethod(event.target.value);
  };

  //handleClose
  const handleClose = () => {
    setError("");
  };

  return (
    <>
      {error && (
        <Alert
          open={true}
          msg={error}
          title={"Alert!"}
          handleClose={handleClose}
        />
      )}
      <ToastContainer />
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
        <Box mt={2} sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }} />
          <StripeCheckout
            description={"Order ID : " + order_id}
            stripeKey="pk_test_51Kx6nmHWfJlN8CzRecv6ZVWZWpauup5Fo4deEtHS1bwcyp5SU1uI88kZL8cEl8GMwTN78m1xM5YJfasV02lsUAPA001KzQi2bZ"
            token={handleSubmit}
            amount={amount * 200}
            name="AgriGo Checkout"
            currency="lkr"
            email="project2020sliit@gmail.com"
          />
          <Box sx={{ flexGrow: 1 }} />
        </Box>
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
        <Button
          variant="contained"
          onClick={isFilled ? props.handleNext : mobilehandleSubmit}
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
