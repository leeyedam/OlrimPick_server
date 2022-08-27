const authRoutes = require("./routes/auth.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

// require("dotenv").config();

// const stream = require("getstream");

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
