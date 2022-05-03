import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Payments() {
  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //data
  const [payment, setpayment] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payment?userID=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setpayment(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //remover handler
  const removehandler = () => {
    axios
      .delete(`http://localhost:5000/api/payment?_id=${payment._id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setpayment({});
      })
      .catch((er) => {});
  };

  return (
    <>
      <Box component={Paper} p={2} elevation={2} square minHeight={"70vh"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#62BB46" }} variant="h4">
            Your Payment Data
          </Typography>
        </Box>
        {isLoaded && payment._id && (
          <Box
            component={Paper}
            variant="outlined"
            sx={{ display: "flex", alignItems: "center" }}
            mt={3}
            p={1.2}
          >
            <Typography variant="h4">{`xxxx xxxx xxxx ${payment.card_number
              .toString()
              .substring(12, 17)}`}</Typography>
            <Typography variant="h4" sx={{ ml: 3 }}>
              {`${payment.expiry_year}/${payment.expiry_month}`}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={removehandler}>Remove</Button>
          </Box>
        )}
        {isLoaded && !payment._id && (
          <Typography sx={{textAlign:"center",my:3}}>No Data available</Typography>
        )}
      </Box>
    </>
  );
}

export default Payments;
