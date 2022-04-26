import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgriCard from "../Utils/AgriCard";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
};

function Dashboard(props) {
  const { token, userID } = useSelector((state) => state.loging);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const findfav = (array, id) => {
    let val = false;
    array.forEach((data) => {
      if (data === id) {
        val = true;
      }
    });
    return val;
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product?pagination=${page}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setProducts(res.data.data);
          const pcount = Math.ceil(+res.data.cdata / 6);
          setCount(pcount);
        }
      })
      .catch((er) => {});
    axios
      .get(`http://localhost:5000/user/favorites?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setFavorites(res.data);
        }
      })
      .catch(() => {});
  }, [page]);
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
                sx={{ color: "#62BB46" }}
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
            {products !== null &&
              products.map((row) => {
                const val = findfav(favorites, row._id);
                return <AgriCard key={row._id} fav={val} data={row} />;
              })}
          </Grid>
          <Box mt={3} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }} />
            <Pagination count={count} color="primary" onChange={handleChange} />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
