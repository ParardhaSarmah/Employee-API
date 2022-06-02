const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/employees", employeeRoutes);
module.exports = app;
