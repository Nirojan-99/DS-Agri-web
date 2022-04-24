import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
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
import { grey, red } from "@mui/material/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function NewProduct(props) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

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
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box component={Paper} elevation={0} square minHeight={"82vh"} py={3}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, color: "#62BB46" }}>
            New Product
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
                      autoComplete="given-name"
                      name="Profuct name"
                      required
                      fullWidth
                      id="name"
                      label="Product Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      label="Price"
                      name="price"
                      autoComplete="price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="category"
                      label="Category"
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
                      id="description"
                      label="description"
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
                  Add
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
