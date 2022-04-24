import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AgriCard from "../../Utils/AgriCard";

function Products() {
  return (
    <>
      <Box component={Paper} p={2} elevation={2} square>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#62BB46" }}>
            Your Products
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            href="/product/add"
            variant="contained"
            disableElevation
            sx={{ "&:hover": { bgcolor: "#333", color: "#62BB46" } }}
          >
            Add Product
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Container maxWidth="xs">
          <AgriCard />
          <AgriCard />
          <AgriCard />
        </Container>
      </Box>
    </>
  );
}

export default Products;
