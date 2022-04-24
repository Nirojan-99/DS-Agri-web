import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <>
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
            {/* <Divider /> */}
          </>
        ))}

        <ListItem sx={{ py: 1, px: 1, border: "2px solid #62BB46" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontFamily: "open sans" }}
          >
            Shipping
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontFamily: "open sans", fontSize: 14 }}
          >
            John Smith
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontFamily: "open sans", fontSize: 14 }}
            variant="sbtitle1"
          >
            {addresses.join(", ")}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={6}
          sx={{ textAlign: "left" }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontFamily: "open sans" }}
          >
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontFamily: "open sans", fontSize: 14 }}
                    gutterBottom
                  >
                    {payment.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{ fontFamily: "open sans", fontSize: 14 }}
                    gutterBottom
                  >
                    {payment.detail}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
