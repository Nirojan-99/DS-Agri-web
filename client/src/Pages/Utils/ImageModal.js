import { Avatar, Box, Button, Grid, Modal } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#62BB46",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

function ImageModal(props) {
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

  const uploadImage = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("id", props.userID);

    axios
      .post(`http://localhost:5000/user/dp/${props.userID}`, data, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        window.location.reload()
      })
      .catch((er) => {});
  };

  const removeImage = () => {
    axios
      .delete(`http://localhost:5000/user/dp/${props.userID}`, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        setPreviewUrl("");
        window.location.reload()
      })
      .catch((er) => {});
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/dp/${props.userID}`, {
        headers: { Authorization: "Agriuservalidation " + props.token },
      })
      .then((res) => {
        setPreviewUrl(res.data.images);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }} width="100%">
            <label
              style={{ width: "100%", bgcolor: "red" }}
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
                  bgcolor: grey[500],
                  color: "#333",
                  width: 330,
                  minHeight: 330,
                  maxHeight: 450,
                  height: "auto",
                  cursor: "pointer",
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
            <br />
            <input
              hidden
              id="image-dp"
              type={"file"}
              onChange={handleOnChange}
            />
            <Grid
              container
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  onClick={uploadImage}
                  disableElevation
                  sx={{
                    bgcolor: "#333",
                    color: "#fff",
                    fontFamily: "open sans",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                  variant="contained"
                  endIcon={<UploadIcon fontSize="small" />}
                >
                  Upload
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={removeImage}
                  disableElevation
                  sx={{
                    color: "#fff",
                    fontFamily: "open sans",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                  color="error"
                  endIcon={<DeleteIcon fontSize="small" />}
                  variant="contained"
                >
                  Remove
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ color: red[900], fontFamily: "open sans" }}
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ImageModal;
