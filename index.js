const authRoutes = require("./routes/auth.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));

// app.use(cors());
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res) => {
  // res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 특정 도메인 허용
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
