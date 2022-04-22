import { Toolbar, Paper, Typography, Box, Button } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

function Footer() {
  return (
    <Paper elevation={5} square>
      <Toolbar>
        <Typography variant="caption" align="center">
          © 2022, made with ❤️ by Silicon Team for a better research . All
          copyrights reserved
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          endIcon={<MessageIcon />}
          variant="text"
          href="/contactus"
          color="success"
        >
          Contact Us
        </Button>
      </Toolbar>
    </Paper>
  );
}

export default Footer;
