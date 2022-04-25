import { IconButton, Slide, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AgriSnackbar(props) {
  return (
    <>
      <Snackbar
        open={props.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={props.msg}
        onClose={props.handler}
        key={"Agri"}
        autoHideDuration={2000}
        action={
          <IconButton sx={{ color: "#333" }} onClick={props.handler}>
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}

export default AgriSnackbar;
