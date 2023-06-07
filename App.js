const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//////env file ////// SECRET DATA
const dotenv = require("dotenv");
dotenv.config();
/////
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const router = require("./Routes/api");
/////////
// const db_uri = "process.env.DATABASE_URL"; ///SECRET INFO
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("MongoDB connected");
});
/////////
app.use("/api/project", require("./Routes/api"));
/////////
server.listen(4000, () => {
  console.log("server running at 4000");
});
