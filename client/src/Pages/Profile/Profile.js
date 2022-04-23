import { Box, Container, Divider, Paper } from "@mui/material";
import Header from "../../Components/Header";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Account from "./Components/Account";
import Products from "./Components/Products";

function Profile(props) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header mode={props.mode} handler={props.handler} />
      <Box
        component={Paper}
        sx={{ typography: "body1" }}
        elevation={0}
        square
        minHeight={"83vh"}
      >
        <TabContext value={value}>
          <Container maxWidth="md">
            <Box component={Paper} elevation={2}>
              <TabList onChange={handleChange}>
                <Tab label="Account" value="1" />
                <Tab label="Products" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Account />
            </TabPanel>
            <TabPanel value="2">
              <Products />
            </TabPanel>
          </Container>
        </TabContext>
      </Box>
    </>
  );
}

export default Profile;
