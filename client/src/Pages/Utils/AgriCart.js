import * as React from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import axios from "axios";

export default function AgriCart(props) {
  const [val, setVal] = useState(0);
  const incVal = () => {
    setVal((pre) => ++pre);
    props.quantityHandler("inc", +props.data.price);
  };
  const decVal = () => {
    if (val >= 1) {
      props.quantityHandler("dec", +props.data.price);
    }
    setVal((pre) => {
      if (pre > 1) {
        return --pre;
      } else {
        return 0;
      }
    });
  };

  return (
    <Card sx={{ display: "flex", my: 3, border: "2px solid #62BB46" }}>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={props.data.images}
        alt="img"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "2 0 auto", textAlign: "left" }}>
          <Typography
            fontFamily={"open sans"}
            fontWeight="bold"
            component="div"
            variant="h5"
            sx={{ color: "#62BB46" }}
          >
            {`$${props.data.price}`}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            component="div"
            fontFamily={"open sans"}
            fontWeight="bold"
          >
            {props.data.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            fontFamily={"open sans"}
            fontWeight="bold"
          >
            {props.data.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            onClick={decVal}
            sx={{
              bgcolor: "#aaa",
              borderRadius: 1,
              mr: 3,
              ml: 1,
              "&:hover": { bgcolor: "#62BB46" },
            }}
          >
            <RemoveOutlinedIcon />
          </IconButton>
          <Typography>{val}</Typography>
          <IconButton
            onClick={incVal}
            sx={{
              bgcolor: "#aaa",
              borderRadius: 1,
              ml: 3,
              "&:hover": { bgcolor: "#62BB46" },
            }}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box p={0.5}>
        <IconButton
          onClick={() => {
            props.removeCart(props.index, props.data._id);
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
