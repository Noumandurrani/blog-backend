const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//////env file ////// SECRET DATA
const dotenv = require("dotenv");
dotenv.config();
/////
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors()); //alow api /// else blocked
const server = http.createServer(app);
const router = require("./Routes/api");
/////////
// const db_uri = "process.env.DATABASE_URL"; ///SECRET INFO
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("MongoDB connected");
});
/////////access files from public folder
app.use(express.static(__dirname + "/public/upload"));
/////////
app.use("/api/project", require("./Routes/api"));
/////////
app.use("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exit!",
  });
});
/////////
server.listen(4000, () => {
  console.log("server running at 4000");
});
