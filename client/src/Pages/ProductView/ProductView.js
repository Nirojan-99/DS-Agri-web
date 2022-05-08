import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductView(props) {
  //product id
  const { id } = useParams();

  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //product data
  const [image, setImage] = useState(null);
  const [ID, setID] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();

  //loading data
  const [isLoaded, setloaded] = useState(false);
  const navigate = useNavigate();

  //useeffect call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setImage(res.data.images);
          setID(res.data.id);
          setTitle(res.data.title);
          setPrice(res.data.price);
          setDescription(res.data.description);
          setCategory(res.data.category);
          setloaded(true);
        }
      })
      .catch((er) => {
        setloaded(true);
        navigate("/", { replace: true });
      });
  }, []);
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box pt={3} minHeight={"81vh"} component={Paper} elevation={1} square>
        <Container maxWidth="md" sx={{ pb: { xs: 3 } }}>
          {isLoaded ? (
            <Grid container component={Paper} variant="outlined">
              <Grid item xs={12} sm={4}>
                <Avatar
                  src={image}
                  variant="square"
                  sx={{
                    borderRadius: "4px",
                    color: "#333",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box p={2}>
                  <Typography variant="h3" sx={{ color: "#62BB46" }}>
                    {title}
                  </Typography>
                  <Typography sx={{ color: "#aaa", mb: 2 }}>
                    ${price}
                  </Typography>
                  <Typography sx={{}}>{category}</Typography>
                  <Typography
                    sx={{
                      color: "#62BB46",
                      textAlign: "justify",
                      fontWeight: "400",
                    }}
                  >
                    {description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              <Skeleton
                animation="pulse"
                variant="rectangular"
                sx={{ borderRadius: 1 }}
                width={"100%"}
                height={250}
              />
            </>
          )}
        </Container>
      </Box>
    </>
  );
}

export default ProductView;
