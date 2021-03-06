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
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import AgriSnackbar from "../Utils/AgriSnackbar";
import { useNavigate } from "react-router-dom";

export default function AgriCard(props) {
  //user data
  const { token, role, userID } = useSelector((state) => state.loging);
  //favorite indicator
  const [fav, setFav] = useState(props.fav);
  //popup indicator
  const [open, setOpen] = useState(false);
  //hooks
  const navigate = useNavigate();
  //add to cart handler
  const addTocart = () => {
    axios
      .put(
        `http://localhost:5000/users/carts`,
        {
          pid: props.data._id,
          _id: userID,
          set: true,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        setOpen(true);
      })
      .catch((er) => {});
  };
  //handle favorite click
  const handlefavorite = (val) => {
    axios
      .put(
        `http://localhost:5000/users/favorites`,
        {
          _id: userID,
          pid: props.data._id,
          val: val,
        },
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        setFav((pre) => !pre);
        props.removeFav(props.index);
      })
      .catch(() => {});
  };

  return (
    <Grid item md={4} sm={6} xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
      <AgriSnackbar
        msg={"Added to cart"}
        open={open}
        handler={() => {
          setOpen(false);
        }}
      />
      <Card
        sx={{
          minWidth: 270,
          border: "2px solid #62BB46",

          "&:hover": {
            boxShadow: "0 0 5px 2px #62BB46",
            transitionDuration: ".5s",
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={props.data.images}
          alt="green iguana"
          onClick={() => {
            navigate(`/product/view/${props.data._id}`);
          }}
          sx={{ cursor: "pointer" }}
        />
        <CardContent>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"left"}
              >
                {props.data.title}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            gutterBottom
            variant="body1"
            textAlign={"left"}
            color="primary"
          >
            {`$${props.data.price}`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"justify"}
          >
            {props.data.description.substring(0, 200) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          {role === "client" ? (
            <>
              <IconButton
                sx={{ color: red[800], mr: 2 }}
                onClick={() => {
                  handlefavorite(!fav);
                }}
              >
                {fav ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <Button
                onClick={addTocart}
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
                disabled={userID !== props.data.user_id}
                href={`/product/edit/${props.data._id}`}
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
                  mr: 1,
                }}
              >
                Edit
              </Button>
              <Button
                disabled={userID !== props.data.user_id}
                onClick={() => {
                  props.clickDelete(props.data._id, props.index);
                }}
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
