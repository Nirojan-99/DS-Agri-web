const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const BodyParser = require("body-parser");
const auth = require("./Middleware/auth");
const authAdmin = require("./Middleware/authAdmin");

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

app.get("/", auth, authAdmin, (req, res) => {
  console.log("called");
  res.send("sdsd");
});

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(5000);
  }
});
