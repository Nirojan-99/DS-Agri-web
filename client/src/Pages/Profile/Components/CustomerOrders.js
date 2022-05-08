import { Box, Paper, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function CustomerOrders() {
  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //data
  const [orders, setOrders] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders?userID=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setOrders(res.data);
          setLoaded(true);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //single order data
  const SingleOrder = (props) => {
    return (
      <Box
        variant="outlined"
        px={1}
        py={2}
        mt={2}
        component={Paper}
        sx={{ display: "flex" ,justifyContent:"space-between"}}
      >
        <Typography variant="h4">
          <span style={{ color: "#62BB46" }}>Order ID :</span>
          {props.data._id}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4">
          <span style={{ color: "#62BB46" }}>Total : </span>
          {props.data.total}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4">
          <span style={{ color: "#62BB46" }}>Status : </span>
          {props.data.status ? "Completed" : "Pending"}
        </Typography>
      </Box>
    );
  };

  // generate array
  const N = 6;
  const count = Array.from({ length: N }, (_, index) => index + 1);

  return (
    <>
      <Box component={Paper} p={2} elevation={2} square minHeight={"70vh"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#62BB46" }} variant="h4">
            Your Orders
          </Typography>
        </Box>
        <Box>
          {isLoaded &&
            orders.length > 0 &&
            orders.map((row, index) => {
              return <SingleOrder data={row} key={index} />;
            })}
          {!isLoaded &&
            count.map((row, index) => {
              return (
                <Skeleton
                  key={index}
                  nimation="pulse"
                  variant="rectangular"
                  sx={{ borderRadius: 1, mb: 2 }}
                  width={"100%"}
                  height={50}
                />
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default CustomerOrders;
