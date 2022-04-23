import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgriCard from "../Utils/AgriCard";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get("email"),
    password: data.get("password"),
  });
};

function Dashboard(props) {
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box py={2} component={Paper} elevation={0} square minHeight={"83vh"}>
        <Container maxWidth="md">
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid
              container
              justifyContent="end"
              alignItems={"center"}
              spacing={1}
            >
              <Grid
                item
                xs={false}
                display={{ xs: "none", sm: "block" }}
                sm={3}
                component={Typography}
                variant="h3"
                fontFamily={"roboto"}
                letterSpacing={1}
                sx={{color:"#62BB46"}}
              >
                AgriGo
              </Grid>
              <Grid item xs={10} sm={7}>
                <TextField
                  margin="none"
                  required
                  fullWidth
                  id="search"
                  label="Search Product"
                  name="search"
                  autoComplete="search"
                  autoFocus
                />
              </Grid>
              <Grid item xs={2} sm={2}>
                <IconButton
                  sx={{
                    bgcolor: "#62BB46",
                    borderRadius: 1,
                    p: 2,
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#62BB46",
                    },
                  }}
                  size="large"
                >
                  <LocationSearchingOutlinedIcon size="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Divider sx={{ my: 2 }} />
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
          <Box mt={3}/>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
