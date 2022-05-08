import { Box, Skeleton } from "@mui/material";

function CartSkelton() {
  return (
    <>
      <Box mb={2} mt={1}>
        <Skeleton
          animation="pulse"
          variant="rectangular"
          sx={{ borderRadius: 1 }}
          width={"100%"}
          height={200}
        />
      </Box>
    </>
  );
}

export default CartSkelton;
