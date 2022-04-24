import { Avatar, Box, Button, Grid, Modal } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { grey, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";

const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#62BB46",
  boxShadow: 24,
  p: 3,
  borderRadius:2
};

function ImageModal(props) {
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose} >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }} width="100%">
            <label style={{ width: "100%", bgcolor: "red" }} htmlFor="image-dp">
              <Avatar
                variant="square"
                sx={{
                  borderRadius: "4px",
                  bgcolor: grey[500],
                  color: "#333",
                  width: 330,
                  height: 330,
                  cursor: "pointer",
                }}
              >
                <CloudUploadIcon
                  sx={{
                    color: "#333",
                    width: 300,
                    height: 300,
                  }}
                />
              </Avatar>
            </label>
            <br />
            <input hidden id="image-dp" type={"file"} />
            <Grid
              container
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  alignItems="center"
                  disableElevation
                  sx={{
                      bgcolor:"#333",
                    color: "#fff",
                    fontFamily: "open sans",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                  variant="contained"
                  endIcon={<UploadIcon fontsize="small" />}
                >
                  Upload
                </Button>
              </Grid>
              <Grid item>
                <Button
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
                  endIcon={<DeleteIcon fontsize="small" />}
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
