import { Box, Paper, Typography } from "@mui/material";
import Header from "../../Components/Header";

function PageNotFound(props) {
  return (
    <>
      <Header handler={props.handler} />
      <Box
        component={Paper}
        elevation={1}
        square
        minHeight={"82vh"}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{ mt: 6, fontFamily: "open sans", color: "#62BB46" }}
        >
          Page Not Found
        </Typography>
      </Box>
    </>
  );
}

export default PageNotFound;
