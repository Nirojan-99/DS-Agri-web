const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const app = express();

const User = require("./Routes/User");
const Product = require("./Routes/Product");
const Order = require("./Routes/Order");
const Payment = require("./Routes/Payment");

const db = require("./db");

app.use(BodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(BodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/Uploads", express.static("Uploads"));

app.use("/user", User);
app.use("/api", Product);
app.use("/api", Order);
app.use("/api", Payment);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(5000);
  }
});
