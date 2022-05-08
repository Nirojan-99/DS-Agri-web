import { Box, Container, Divider, Paper } from "@mui/material";
import Header from "../../Components/Header";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Account from "./Components/Account";
import Products from "./Components/Products";
import { useSelector } from "react-redux";
import Orders from "./Components/Orders";
import CustomerOrders from "./Components/CustomerOrders";
import Payments from "./Components/Payments";

function Profile(props) {
  //initial vaue for tab bar
  const [value, setValue] = useState("1");

  //tab bar handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //user data
  const { role } = useSelector((state) => state.loging);

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
                <Tab label="Orders" value="4" />
                {role === "client" && <Tab label="Payment" value="3" />}
                {role === "farmer" && <Tab label="Products" value="2" />}
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ m: 0, p: 0, mt: 2 }}>
              <Account />
            </TabPanel>
            <TabPanel value="2" sx={{ m: 0, p: 0, mt: 2 }}>
              <Products />
            </TabPanel>
            <TabPanel value="3" sx={{ m: 0, p: 0, mt: 2 }}>
              <Payments />
            </TabPanel>
            <TabPanel value="4" sx={{ m: 0, p: 0, mt: 2 }}>
              {role === "farmer" ? <Orders /> : <CustomerOrders />}
            </TabPanel>
          </Container>
        </TabContext>
      </Box>
    </>
  );
}

export default Profile;
