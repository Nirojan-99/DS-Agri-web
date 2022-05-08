import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import AgriCard from "../../Utils/AgriCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ack from "../../../Components/Ack";
import axios from "axios";
import AgriSkelton from "../../Utils/AgriSkelton";

function Products() {
  const { token, userID } = useSelector((state) => state.loging);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState();
  const [index, setIndex] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/products?pagination=${page}&owner=${userID}`,
        {
          headers: { Authorization: "Agriuservalidation " + token },
        }
      )
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
  }, [page]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
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
      <Ack
        title={"Alert"}
        open={open}
        handleClose={handleClose}
        msg="Are you sure to delete"
        handleYes={handleYes}
      />
      <Box component={Paper} p={2} elevation={2} square minHeight={"70vh"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#62BB46" }}>
            Your Products
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            href="/product/add"
            variant="contained"
            disableElevation
            sx={{ "&:hover": { bgcolor: "#333", color: "#62BB46" } }}
          >
            Add Product
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Container maxWidth="xs">
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
              // const val = findfav(favorites, row._id);
              return (
                <AgriCard
                  clickDelete={clickDelete}
                  key={row._id}
                  // fav={val}
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
          <Box sx={{ display: "flex", alignItems: "center" }} mt={6}>
            <Box sx={{ flexGrow: 1 }} />
            <Pagination count={count} color="primary" onChange={handleChange} />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Products;
