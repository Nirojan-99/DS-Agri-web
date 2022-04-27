// import * as React from "react";
// import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Grid from "@mui/material/Grid";
// import { Divider, Box, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// // const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
// // const payments = [
// //   { name: "Card type", detail: "Visa" },
// //   { name: "Card holder", detail: "Mr John Smith" },
// //   { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
// //   { name: "Expiry date", detail: "04/2024" },
// // ];

// export default function Review(props) {
//   const { token, userID } = useSelector((state) => state.loging);

//   // const [total, setTotal] = useState();
//   // const [address, setaddresses] = useState();
//   // const [payment, setpayment] = useState();
//   // const [paymentDetails, setTotal] = useState();
//   // const [total, setTotal] = useState();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/order?_id=${props.id}`, {
//         headers: { Authorization: "Agriuservalidation " + token },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((er) => {
//         console.log(er);
//       });
//   }, []);
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Order summary
//       </Typography>
//       <List disablePadding>
//         <ListItem sx={{ py: 1, px: 1, border: "2px solid #62BB46" }}>
//           <ListItemText primary="Total" />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             {`$${total}`}
//           </Typography>
//         </ListItem>
//       </List>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ mt: 2, fontFamily: "open sans" }}
//           >
//             Shipping
//           </Typography>
//           {/* <Typography
//             gutterBottom
//             sx={{ fontFamily: "open sans", fontSize: 14 }}
//           >
//             John Smith
//           </Typography> */}
//           <Typography
//             gutterBottom
//             sx={{ fontFamily: "open sans", fontSize: 14 }}
//             variant="sbtitle1"
//           >
//             {/* {addresses.join(", ")} */}
//           </Typography>
//         </Grid>
//         <Grid
//           item
//           container
//           direction="column"
//           xs={12}
//           sm={6}
//           sx={{ textAlign: "left" }}
//         >
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ mt: 2, fontFamily: "open sans" }}
//           >
//             Payment details
//           </Typography>
//           <Grid container>
//             {payments.map((payment) => (
//               <>
//                 <Grid item xs={6}>
//                   <Typography
//                     sx={{ fontFamily: "open sans", fontSize: 14 }}
//                     gutterBottom
//                   >
//                     {payment}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography
//                     sx={{ fontFamily: "open sans", fontSize: 14 }}
//                     gutterBottom
//                   >
//                     {paymentdetail}
//                   </Typography>
//                 </Grid>
//               </>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//         {/* <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
//           Back
//         </Button> */}
//         <Button
//           variant="contained"
//           onClick={props.handleNext}
//           sx={{
//             mt: 3,
//             ml: 1,
//             "&:hover": { bgcolor: "#333", color: "#fff" },
//           }}
//         >
//           Place order
//         </Button>
//       </Box>
//     </React.Fragment>
//   );
// }
