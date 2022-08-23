const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require("twilio")(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// const PORT = process.env.PORT || 5000;

require("dotenv").config();

let streamKey = process.env.REACT_APP_STREAM_API_KEY;
let streamSecret = process.env.REACT_APP_STREAM_API_SECRET;
let streamAppID = process.env.REACT_APP_TREAM_APP_ID;

const stream = require("getstream");

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/feeds/:feedID/token", (req, res) => {
  // req.params.feedID will usually look something like `profile:1234`
  let [slug, id] = req.params.feedID.split(":"); // this splits the "profile" and "1234" into separate variables, using array destructuring, but is only available in ES6 (node.js 6+)
  let token = streamClient.feed(slug, id).getReadOnlyToken();
  res.send(token);
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
