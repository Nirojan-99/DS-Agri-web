import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { red } from "@mui/material/colors";

export default function AgriCard() {
  return (
    <Grid item md={4} sm={6} xs={12} sx={{ mt: 2 }}>
      <Card sx={{ minWidth: 270, border: "2px solid #62BB46" }}>
        <CardMedia
          component="img"
          height="160"
          image="https://img1.exportersindia.com/product_images/bc-full/dir_94/2809460/cereals-and-pulses-958483.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"left"}
          >
            Grocery Name
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            textAlign={"left"}
            color="primary"
          >
            $199.90
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"justify"}
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          {true ? (
            <>
              <IconButton sx={{ color: red[800], mr: 2 }} onClick={() => {}}>
                {false ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <Button
                component={Typography}
                variant="contained"
                size="small"
                startIcon={<ShoppingCartOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#333",
                    color: "#62BB46",
                  },
                }}
              >
                ADD to CART
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/product/edit/id"
                component={Button}
                variant="contained"
                size="small"
                startIcon={<ModeEditOutlineOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#444",
                    color: "#62BB46",
                  },
                  mr:1
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {}}
                color="error"
                component={Typography}
                variant="contained"
                size="small"
                startIcon={<DeleteOutlineOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#444",
                    color: "#62BB46",
                  },
                }}
              >
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
