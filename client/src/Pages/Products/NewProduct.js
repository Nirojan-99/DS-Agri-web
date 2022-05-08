import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import Header from "../../Components/Header";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Alert from "../../Components/Alert";

function NewProduct(props) {
  //data
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  //useEffect call on edit
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          if (res.data.user_id !== userID) {
            navigate("/", { replace: true });
            return;
          }
          if (res.data) {
            setPreviewUrl(res.data.images);
            setID(res.data.id);
            setTitle(res.data.title);
            setPrice(res.data.price);
            setDescription(res.data.description);
            setCategory(res.data.category);
          }
        })
        .catch((er) => {
          navigate("/", { replace: true });
        });
    }
  }, []);

  //hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //form data
  const [image, setImage] = useState(null);
  const [ID, setID] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();

  //user data
  const { token, userID } = useSelector((state) => state.loging);

  //file handle
  const handleFile = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };

  const handleOnChange = (event) => {
    let imageFile = event.target.files[0];
    handleFile(imageFile);
  };

  //submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !ID.trim() ||
      !title.trim() ||
      !price.trim() ||
      !description.trim() ||
      !category.trim()
    ) {
      setError("All Fields are required");
      return;
    }
    if (isNaN(price)) {
      setError("Invalid Price");
      return;
    }

    const data = new FormData();

    data.append("title", title);
    data.append("price", price);
    data.append("description", description);
    data.append("category", category);
    data.append("id", ID);
    data.append("user_id", userID);
    data.append("image", image);
    data.append("_id", id ? id : "");

    if (id) {
      axios
        .put(`http://localhost:5000/api/products`, data, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          navigate("/");
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post(`http://localhost:5000/api/products`, data, {
          headers: { Authorization: "Agriuservalidation " + token },
        })
        .then((res) => {
          navigate("/");
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  //close Alert
  const handleClose = () => {
    setError("");
  };

  return (
    <>
      <Alert
        open={error}
        handleClose={handleClose}
        title="Alert!"
        msg={error}
      />
      <Header mode={props.mode} handler={props.handler} />
      <Box component={Paper} elevation={0} square minHeight={"82vh"} py={3}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ mb: 3, color: "#62BB46", fontFamily: "open sans" }}
          >
            {id ? "Update Product" : "New Product"}
          </Typography>
          <Grid
            component={Paper}
            elevation={2}
            container
            justifyContent={"center"}
            alignItems="center"
            sx={{ border: "2px solid #62BB46", p: 2, borderRadius: 2 }}
          >
            <Grid item xs={12} md={5}>
              <Box p={{ md: 0, xs: 3 }}>
                <Box
                  component={Tooltip}
                  title="change image"
                  sx={{}}
                  TransitionComponent={Zoom}
                >
                  <label
                    htmlFor="image-dp"
                    onDragOver={handleDragOver}
                    onDrop={handleOnDrop}
                    onChange={handleOnDrop}
                  >
                    <Avatar
                      src={previewUrl && previewUrl}
                      variant="square"
                      sx={{
                        borderRadius: "4px",
                        color: "#333",
                        width: { ...{ xs: "70%", md: "100%" } },
                        maxHeight: 400,
                        height: "auto",
                        cursor: "pointer",
                        pl: { xs: "15%", md: "0" },
                      }}
                    >
                      {!previewUrl && (
                        <CloudUploadIcon
                          sx={{
                            color: "#333",
                            width: 300,
                            height: 300,
                          }}
                        />
                      )}
                    </Avatar>
                  </label>
                </Box>
                <input
                  hidden
                  id="image-dp"
                  type={"file"}
                  onChange={handleOnChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ p: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-id"
                      name="id"
                      required
                      fullWidth
                      inputProps={{ sx: { color: "#62BB46" } }}
                      value={ID}
                      onChange={(event) => {
                        setID(event.target.value);
                      }}
                      id="id"
                      placeholder="Product ID"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-name"
                      name="Profuct name"
                      required
                      fullWidth
                      inputProps={{ sx: { color: "#62BB46" } }}
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                      id="name"
                      placeholder="Product Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      inputProps={{ sx: { color: "#62BB46" } }}
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                      id="price"
                      placeholder="Price"
                      name="price"
                      autoComplete="price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      inputProps={{ sx: { color: "#62BB46" } }}
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                      id="category"
                      placeholder="Category"
                      name="category"
                      autoComplete="category"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      height={1000}
                      maxRows={4}
                      required
                      fullWidth
                      inputProps={{ sx: { color: "#62BB46" } }}
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      id="description"
                      placeholder="description"
                      name="description"
                      autoComplete="description"
                      multiline
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    "&:hover": { bgcolor: "#333", color: "#fff" },
                  }}
                >
                  {id ? "Update" : "Add"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default NewProduct;
