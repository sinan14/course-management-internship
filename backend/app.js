const express = require("express");
const app = new express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const ImageDataURI = require("image-data-uri");



app.use(express.static("public"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));



adminemail = "admin@gmail.com";
password = "admin@123";
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/images/requests");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// here we go

// const studentRoutes = require("./routes/studentRoutes");
// const employeeRoutes = require("./routes/employeeRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/searchRoutes");
// app.use("/students", studentRoutes);
// app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);
app.use("/trainers", trainerRoutes);
app.use("/search", searchRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";

  console.log({ status: statusCode });
  console.log({ errorMessage: err.message });
  res.send({ status: statusCode, error: err });
});

app.listen(3000, function () {
  console.log("listening to port number: 3000");
});
