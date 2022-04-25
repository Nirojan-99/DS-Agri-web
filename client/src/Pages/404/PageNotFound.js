import { Box, Paper } from "@mui/material";
import Header from "../../Components/Header";

function PageNotFound(props) {
  return (
    <>
      <Header handler={props.handler} />
      <Box component={Paper} elevation={1} square minHeight={"82vh"}></Box>
    </>
  );
}

export default PageNotFound;
