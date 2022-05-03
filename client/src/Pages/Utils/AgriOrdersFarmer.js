import { Box, Button, Paper, Typography } from "@mui/material";

const SingleOrder = (props) => {
  return (
    <Box sx={{ display: "flex" }} py={1}>
      <Typography>Quantity : {props.data.count}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography>
        {`${props.data.address.address} / ${props.data.address.city} / ${props.data.address.province}`}
      </Typography>
    </Box>
  );
};

function AgriOrdersFarmer(props) {
  return (
    <>
      <Box component={Paper} variant="outlined" my={2} p={2}>
        <Box
          pb={2}
          mb={2}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #62BB46",
          }}
        >
          <Typography sx={{ color: "#62BB46" }} variant="h4">
            Product ID : {`${props.id}`}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button href={`/product/edit/${props.id}`} variant="outlined">
            View Product
          </Button>
        </Box>
        <Box>
          {props.value.map((row) => {
            return <SingleOrder data={row} />;
          })}
        </Box>
      </Box>
    </>
  );
}

export default AgriOrdersFarmer;
