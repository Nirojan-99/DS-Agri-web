import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgriCart from "../Utils/AgriCart";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CartSkelton from "../Utils/CartSkelton";

function Cart(props) {
  const { userID, token } = useSelector((state) => state.loging);
  const [cart, setCart] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const calTotal = () => {
    let total = 0;
    cart.forEach((row) => {
      total += row.price;
    });
    return total;
  };

  const removeCart = (index, id) => {
    console.log(index);
    axios
      .delete(`http://localhost:5000/user/cart?id=${userID}&pid=${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setCart((pre) => {
          const array = [...pre];
          array.splice(index, 1);
          return array;
        });
      })
      .catch((er) => {});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/cart?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        axios
          .get(
            `http://localhost:5000/api/product?pagination=${1}&favList=${
              res.data.length != 0 ? res.data : ["1", "2"]
            }`,
            {
              headers: { Authorization: "Agriuservalidation " + token },
            }
          )
          .then((res) => {
            if (res.data) {
              setCart(res.data.data);
              setLoaded(true);
            }
          })
          .catch((er) => {
            setLoaded(true);
          });
      })
      .catch((er) => {});
  }, []);
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box py={1} component={Paper} elevation={0} square minHeight={"65vh"}>
        <Container maxWidth="md">
          <Grid
            maxWidth="md"
            container
            justifyContent="center"
            alignItems={"center"}
            spacing={1}
            sx={{ textAlign: "left" }}
          >
            <Grid
              item
              xs={6}
              component={Typography}
              variant="h3"
              fontFamily={"roboto"}
              letterSpacing={1}
              sx={{ color: "#62BB46", my: 2 }}
            >
              Cart
            </Grid>
            <Grid
              item
              xs={6}
              component={Typography}
              variant="h4"
              fontFamily={"roboto"}
              letterSpacing={1}
              sx={{ color: "#4d9537", my: 2, textAlign: "right" }}
            >
              {`Total : $${calTotal()}`}
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container maxWidth="md" sx={{ py: 1 }}>
          <Box minHeight="60vh">
            {isLoaded ? (
              cart.map((row, index) => {
                return (
                  <AgriCart
                    index={index}
                    removeCart={removeCart}
                    key={row._id}
                    data={row}
                  />
                );
              })
            ) : (
              <>
                <CartSkelton />
                <CartSkelton />
              </>
            )}
          </Box>
        </Container>
        <Divider />
        <Container maxWidth="md" sx={{ py: { xs: 1, sm: 3 } }}>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography fontFamily={"open sans"} fontWeight="bold">
                Total : {`$${calTotal()}`}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                disabled={!calTotal()}
                href="/checkout"
                sx={{
                  textTransform: "none",
                  "&:hover": { bgcolor: "#333", color: "#fff" },
                }}
                variant="contained"
                startIcon={<ShoppingCartCheckoutOutlinedIcon />}
              >
                CheckOut
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Cart;
