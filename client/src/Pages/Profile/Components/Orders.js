import { Box, Paper, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AgriOrdersFarmer from "../../Utils/AgriOrdersFarmer";
import { useSelector } from "react-redux";
import CartSkelton from "../../Utils/CartSkelton";
import AgriSkelton from "../../Utils/AgriSkelton";

function Orders() {
  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //data
  const [orders, setOrders] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  // useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/order/${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setOrders(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  const LoopOrders = () => {
    let Element = [];
    for (let key in orders) {
      if (orders[key][0]) {
        Element.push(key);
      }
    }
    return Element;
  };

  return (
    <>
      <Box component={Paper} p={2} elevation={2} square minHeight={"70vh"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ color: "#62BB46" }} variant="h3">
            Your Orders
          </Typography>
        </Box>
        {orders &&
          isLoaded &&
          LoopOrders().map((row) => {
            return <AgriOrdersFarmer id={row} value={orders[row]} key={row} />;
          })}
        {!isLoaded && (
          <>
            <Skeleton
              nimation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={200}
            />
            <Skeleton
              nimation="pulse"
              variant="rectangular"
              sx={{ borderRadius: 1, mb: 2 }}
              width={"100%"}
              height={200}
            />
          </>
        )}
        {isLoaded && !orders && (
          <>
            <Typography sx={{ textAlign: "center", my: 2 }}>
              No Orders
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default Orders;
