import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../Components/Header";
import AgriCard from "../Utils/AgriCard";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AgriSkelton from "../Utils/AgriSkelton";
import Ack from "../../Components/Ack";

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
  const [isLoaded, setLoaded] = useState(false);
  const [search, setSearch] = useState();
  const [isEmpty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const [index, setIndex] = useState();

  const searchHandler = () => {
    setPage(1);
    setLoaded(false);
    setEmpty(false);
    axios
      .get(
        `http://localhost:5000/api/products?pagination=${page}&title=${search}`,
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.data.length !== 0) {
          setProducts(res.data.data);
          setLoaded(true);
        } else {
          setEmpty(true);
          setLoaded(true);
        }
      })
      .catch((er) => {
        setLoaded(true);
        setEmpty(true);
      });
  };

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
      .get(`http://localhost:5000/api/products?pagination=${page}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setProducts(res.data.data);
          setLoaded(true);
          const pcount = Math.ceil(+res.data.cdata / 6);
          setCount(pcount);
        }
      })
      .catch((er) => {
        setLoaded(true);
        setEmpty(true);
      });
    axios
      .get(`http://localhost:5000/users/favorites?_id=${userID}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setFavorites(res.data);
        }
      })
      .catch(() => {});
  }, [page]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    console.log("ddd");
    axios
      .delete(`http://localhost:5000/api/products?_id=${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setProducts((pre) => {
          const array = [...pre];
          array.splice(index, 1);
          return array;
        });
      })
      .catch((er) => {});
  };
  const clickDelete = (id, index) => {
    setOpen(true);
    setID(id);
    setIndex(index);
  };
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Ack
        title={"Alert"}
        open={open}
        handleClose={handleClose}
        msg="Are you sure to delete"
        handleYes={handleYes}
      />
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
                  onKeyUp={searchHandler}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
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
                  onClick={searchHandler}
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
            alignItems={"stretch"}
            spacing={4}
            minHeight="50vh"
          >
            {isEmpty && (
              <>
                <Box mt={7} component={Typography} sx={{ textAlign: "center" }}>
                  No products to show
                </Box>
              </>
            )}
            {!isEmpty &&
              isLoaded &&
              products.map((row, index) => {
                const val = findfav(favorites, row._id);
                return (
                  <AgriCard
                    clickDelete={clickDelete}
                    key={row._id}
                    fav={val}
                    data={row}
                    index={index}
                  />
                );
              })}
            {!isLoaded && (
              <>
                <AgriSkelton />
                <AgriSkelton />
                <AgriSkelton />
              </>
            )}
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
