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

function Cart(props) {
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box py={1} component={Paper} elevation={0} square minHeight={"83vh"}>
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
              Total : $200.00
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Container maxWidth="md" sx={{ py: 1 }}>
          <AgriCart />
          <AgriCart />
          <AgriCart />
        </Container>
        <Divider />
        <Container maxWidth="md" sx={{ py: { xs: 1, sm: 3 } }}>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography fontFamily={"open sans"} fontWeight="bold">
                Total : $1200.00
              </Typography>
            </Grid>
            <Grid item>
              <Button
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
