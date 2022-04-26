import { Box, Grid, Skeleton } from "@mui/material";

function AgriSkelton() {
  return (
    <>
      <Grid
        item
        md={4}
        sm={6}
        xs={12}
        sx={{ mt: { xs: 1, sm: 2 }, textAlign: "center" }}
      >
        <Skeleton
          nimation="pulse"
          variant="rectangular"
          sx={{ borderRadius: 1 }}
          width={"100%"}
          height={200}
        />
        <Skeleton
          nimation="pulse"
          variant="text"
          sx={{ borderRadius: 1 }}
          width={"100%"}
        />
        <Skeleton
          nimation="pulse"
          variant="text"
          sx={{ borderRadius: 1 }}
          width={"100%"}
        />
        <Skeleton
          nimation="pulse"
          variant="text"
          sx={{ borderRadius: 1 }}
          width={"100%"}
        />
        <Skeleton
          nimation="pulse"
          variant="rectangular"
          sx={{ borderRadius: 1 }}
          width={"100%"}
          height={30}
        />
      </Grid>
    </>
  );
}

export default AgriSkelton;
