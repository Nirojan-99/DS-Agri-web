import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../../Component/Header";

function Profile(props) {
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
            Profile
          </Grid>
        </Container>
        <Divider />
      </Box>
    </>
  );
}

export default Profile;
