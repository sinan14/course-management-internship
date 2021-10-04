const express = require('express');
const app = new express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const wrapAsync = require('./util/wrapAsync');
const ExpressError = require('./util/ExpressError');

//*************************** connecting our database ****************************
// const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/project-mean";
const dbUrl =
  'mongodb+srv://userone:sinu1@ictakfiles.g1s0x.mongodb.net/course-management?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected');
});

app.use(express.static('public'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
  secret: 'thisisverysecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    cookie: { secure: false },
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60,
  },
};
app.use(session(sessionConfig));
// adminemail = "admin@gmail.com";
// password = "admin@123";
// var storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./public/images/requests");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const studentRoutes = require('./routes/studentRoutes');
const professorRoutes = require('./routes/professorRoutes');
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/professors', professorRoutes);
app.use('/api/v1/courses', courseRoutes);

//
// const adminRoutes = require("./routes/adminRoutes");
// app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';

  console.log({ status: statusCode });
  console.log({ errorMessage: err.message });
  res.send({ status: statusCode, error: err });
});

app.listen(3000, function () {
  console.log('listening to port number: 3000');
});
