import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddressForm(props) {
  //user data
  const { userID, token } = useSelector((state) => state.loging);

  // form data
  const [fName, setFName] = useState();
  const [LName, setLName] = useState();
  const [address, setAddess] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalcode, setPostalCode] = useState();
  const [country, setCountry] = useState();

  //data
  const [isFilled, setFilled] = useState(false);
  const [error, setError] = useState("");

  //useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users?ID=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setFName(res.data.firstName);
        setLName(res.data.lastName);
      })
      .catch((er) => {
        console.log(er);
      });

    //get order data
    axios
      .get(`http://localhost:5000/api/orders?_id=${props.id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setAddess(res.data.address.address);
        setCity(res.data.address.city);
        setProvince(res.data.address.province);
        setPostalCode(res.data.address.postalcode);
        setCountry(res.data.address.country);
        setFilled(true);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fName.trim() || !LName.trim()) {
      setError("Invalid  Name");
      return;
    }
    if (!address.trim()) {
      setError("Address required");
      return;
    }
    if (!city.trim()) {
      setError("City Required");
      return;
    }
    if (!province.trim()) {
      setError("provimce Required");
      return;
    }
    if (!postalcode.trim() || isNaN(postalcode)) {
      setError("Invalid postalcode");
      return;
    }
    if (!country.trim()) {
      setError("Country Required");
      return;
    }

    axios
      .put(
        `http://localhost:5000/api/orders`,
        {
          address,
          city,
          province,
          postalcode,
          country,
          _id: props.id,
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
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ color: "#62BB46", mb: 2 }}>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            disabled
            required
            inputProps={{ sx: { color: "#62BB46" } }}
            value={fName}
            onChange={(event) => {
              setFName(event.target.value);
            }}
            autoFocus
            id="firstName"
            placeholder="First name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            required
            inputProps={{ sx: { color: "#62BB46" } }}
            id="lastName"
            name="lastName"
            placeholder="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            value={LName}
            onChange={(event) => {
              setLName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled={isFilled}
            inputProps={{ sx: { color: "#62BB46" } }}
            id="address"
            name="address"
            placeholder="Address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(event) => {
              setAddess(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={isFilled}
            inputProps={{ sx: { color: "#62BB46" } }}
            id="city"
            name="city"
            placeholder="City"
            fullWidth
            autoComplete="city"
            variant="outlined"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            placeholder="Province"
            required
            disabled={isFilled}
            inputProps={{ sx: { color: "#62BB46" } }}
            fullWidth
            variant="outlined"
            value={province}
            onChange={(event) => {
              setProvince(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={isFilled}
            inputProps={{ sx: { color: "#62BB46" } }}
            id="zip"
            name="zip"
            placeholder="Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
            value={postalcode}
            onChange={(event) => {
              setPostalCode(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={isFilled}
            inputProps={{ sx: { color: "#62BB46" } }}
            id="country"
            name="country"
            placeholder="Country"
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
