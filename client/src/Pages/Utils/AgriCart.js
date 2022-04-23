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

export default function AgriCart() {
  // const theme = useTheme();

  return (
    <Card sx={{ display: "flex", my: 3, border: "2px solid #62BB46" }}>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image="https://img1.exportersindia.com/product_images/bc-full/dir_94/2809460/cereals-and-pulses-958483.jpg"
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
            $199.99
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            component="div"
            fontFamily={"open sans"}
            fontWeight="bold"
          >
            Grocery Name
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            fontFamily={"open sans"}
            fontWeight="bold"
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
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
          <Typography>1</Typography>
          <IconButton
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
        <IconButton>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
