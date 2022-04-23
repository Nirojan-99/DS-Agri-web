import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../../Component/Header";
import AgriCard from "../Utils/AgriCard";

function Favorites(props) {
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box py={1} component={Paper} elevation={0} square minHeight={"83vh"}>
        <Container maxWidth="lg">
          <Grid
            textAlign={"left"}
            item
            xs={12}
            component={Typography}
            variant="h3"
            fontFamily={"roboto"}
            letterSpacing={1}
            sx={{ color: "#62BB46", my: 2 }}
          >
            Favorites
          </Grid>
        </Container>
        <Divider />
        <Container maxWidth="lg">
          <Grid
            container
            direction={"row"}
            justifyContent="center"
            alignItems={"center"}
            spacing={4}
          >
            <AgriCard />
            <AgriCard />
            <AgriCard />
            <AgriCard />
            <AgriCard />
            <AgriCard />
          </Grid>
          <Box mt={3} />
        </Container>
      </Box>
    </>
  );
}

export default Favorites;
