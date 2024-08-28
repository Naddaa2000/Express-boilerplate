const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var http = require("http");

require("dotenv").config();
const studentrouter = require("./routes/students");

const app = express();
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
app.use(
  cors({
    allowedHeaders: ["Authorization", "Content-Type"],
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);
app.use(express.json());
http.get(process.env.BASE_URL);
try {
  con.on("open", () => {
    console.log("Connected to the database " + url);
  });
} catch (error) {
  console.log("Error: " + error);
}
let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
app.use("/students", studentrouter);
