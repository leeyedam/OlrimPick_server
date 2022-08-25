const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));

require("dotenv").config();

// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hi");
});

// require("dotenv").config();

// const stream = require("getstream");

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
