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
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CartSkelton from "../Utils/CartSkelton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Cart(props) {
  //data
  const { userID, token } = useSelector((state) => state.loging);
  const [cart, setCart] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartObj, setCartObj] = useState({});

  //hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //checkout
  const checkOutHandler = () => {
    console.log(cartObj);
    axios
      .post(
        `http://localhost:5000/api/orders`,
        {
          products: cartObj,
          user_id: userID,
          total,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        navigate(`/checkout/${res.data._id}`, { replace: true });
      })
      .catch((er) => {});
  };

  //quantity Handler
  const quantityHandler = (operation, price, id, amount) => {
    setCartObj((pre) => {
      let obj = { ...pre, [id]: amount };
      return obj;
    });

    if (operation === "inc") {
      setTotal((pre) => {
        let val;
        val = pre * 100 + price * 100;
        return val / 100;
      });
    } else {
      setTotal((pre) => (pre * 100 - price * 100) / 100);
    }
  };

  //total amount calculator
  const calTotal = () => {
    let total = 0;
    cart.forEach((row) => {
      total += row.price;
    });
    return total;
  };

  //remove cart element
  const removeCart = (index, id) => {
    axios
      .delete(`http://localhost:5000/users/carts?id=${userID}&pid=${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setTotal((pre) => {
          let data = +pre * 100;
          let minus = +cartObj[id];
          data -= minus * (+cart[index].price * 100);
          return data / 100;
        });
        setCartObj((pre) => {
          console.log(id);
          const { [id]: dummy, ...objectWithoutDeleted } = pre;
          return objectWithoutDeleted;
        });
        setCart((pre) => {
          const array = [...pre];
          array.splice(index, 1);
          return array;
        });
      })
      .catch((er) => {});
  };

  //useEffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/carts?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        axios
          .get(
            `http://localhost:5000/api/products?pagination=${1}&favList=${
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
              setCartObj((pre) => {
                let obj = [];
                for (let i = 0; i < res.data.data.length; i++) {
                  obj = { ...obj, [res.data.data[i]._id]: 1 };
                }
                return obj;
              });
              setTotal((pre) => {
                let data = 0;
                for (let i = 0; i < res.data.data.length; i++) {
                  data += +res.data.data[i].price * 100;
                }
                return data / 100;
              });
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
              Your Cart
            </Grid>
            <Grid
              item
              xs={6}
              component={Typography}
              variant="h4"
              fontFamily={"roboto"}
              letterSpacing={1}
              sx={{ color: "#62BB46", my: 2, textAlign: "right" }}
            >
              {`Total : $${total}`}
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
                    quantityHandler={quantityHandler}
                  />
                );
              })
            ) : (
              <>
                <CartSkelton />
                <CartSkelton />
              </>
            )}
            {isLoaded && cart.length === 0 && (
              <Box mt={3}>
                <Typography textAlign={"center"} sx={{color:"#4d9537"}}>Cart is Empty</Typography>
              </Box>
            )}
          </Box>
        </Container>
        <Divider />
        <Container maxWidth="md" sx={{ py: { xs: 1, sm: 3 } }}>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              {/* <Typography fontFamily={"open sans"} fontWeight="bold">
                Total : {`$${total}`}
              </Typography> */}
            </Grid>
            <Grid item>
              <Button
                onClick={checkOutHandler}
                disabled={!calTotal()}
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
