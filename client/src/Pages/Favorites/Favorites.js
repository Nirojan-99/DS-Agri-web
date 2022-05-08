import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgriCard from "../Utils/AgriCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AgriSkelton from "../Utils/AgriSkelton";

function Favorites(props) {
  //state data
  const [products, setProducts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //pagination
  const handleChange = (event, value) => {
    setPage(value);
  };

  //remove favorite handler
  const removeFav = (index) => {
    setProducts((pre) => {
      const array = [...pre];
      array.splice(index, 1);
      return array;
    });
  };

  useEffect(() => {
    //get fav id
    axios
      .get(`http://localhost:5000/users/favorites?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          //get products for fav id
          axios
            .get(
              `http://localhost:5000/api/products?pagination=${page}&favList=${
                res.data.length != 0 ? res.data : ["1", "2"]
              }`,
              {
                headers: { Authorization: "Agriuservalidation " + token },
              }
            )
            .then((res) => {
              if (res.data) {
                setProducts(res.data.data);
                const pcount = Math.ceil(+res.data.cdata / 6);
                setCount(pcount);
                setLoaded(true);
              }
            })
            .catch((er) => {
              setLoaded(true);
            });
        }
      })
      .catch(() => {});
  }, [page]);

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
        <Divider sx={{ mb: 1 }} />
        <Container maxWidth="lg">
          <Box minHeight={"55vh"}>
            <Grid
              container
              direction={"row"}
              justifyContent="center"
              alignItems={"center"}
              spacing={4}
            >
              {isLoaded ? (
                products.map((row, index) => {
                  return (
                    <AgriCard
                      removeFav={removeFav}
                      index={index}
                      key={row._id}
                      data={row}
                      fav={true}
                    />
                  );
                })
              ) : (
                <>
                  <AgriSkelton />
                  <AgriSkelton />
                  <AgriSkelton />
                </>
              )}
            </Grid>
          </Box>
          <Box my={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }} />
            <Pagination count={count} color="primary" onChange={handleChange} />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Box mt={3} />
        </Container>
      </Box>
    </>
  );
}

export default Favorites;
