const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const employeeRoutes = require("./routes/employeeRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ems-bay-seven.vercel.app"
  ]
}));
app.use(express.json());

app.use(loggerMiddleware);


// Routes

app.use("/employees", employeeRoutes);


app.get("/", (req, res) => {

  res.send("Employee Management API Running");

});

mongoose.connect("mongodb+srv://Mohit:mohitleo1@cluster0.wyvssjm.mongodb.net/EMS").then(() => {

  console.log("MongoDB Connected");}).catch((err) => {

  console.log("MongoDB Connection Error:", err);});

app.listen(5100, () => {

  console.log("Server Running on Port 5100");

});