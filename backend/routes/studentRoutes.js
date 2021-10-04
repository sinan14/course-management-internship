const express = require('express');
const wrapAsync = require('../util/wrapAsync');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../model/student');
const { verifyToken } = require('../middleware');
const nodemailer = require('nodemailer');
const multer = require('multer');
var imagedest = __dirname;
var upload = multer({ dest: imagedest });
const fs = require('fs');
const generator = require('generate-password');

//************************************************ */

router.post('/register', upload.single('img'), (req, res) => {
  console.log(req.body);
  var st = {
    Name: req.body.Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Sex: req.body.Sex,
    DOB: req.body.DOB,
    Course: req.body.Course,
    HighestQualification: req.body.HighestQualification,
    PassOfYear: req.body.PassOfYear,
    State: req.body.State,
    District: req.body.District,
    Post: req.body.Post,
    PinCode: req.body.PinCode,
    Status: req.body.Status,
    CreationDate: req.body.CreationDate,
    PaymentDate: req.body.PaymentDate,
    ApprovalDate: req.body.ApprovalDate,
    Password: 'NewRegister@2020',
    Suid: 'New Register',
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: 'image',
    },
  };
  var student = new Student(st);
  console.log(student);
  student
    .save()
    .then(function (data) {
      res.send({ status: true });
    })
    .catch(function (error) {
      console.log(error);
      res.send({ status: false });
    });
});

//************************      checks login            ************************ */
router.post(
  '/login',
  wrapAsync(async function (req, res) {
    console.log(req.body);
    const { Email, Password } = req.body;
    Student.findOne(
      { Email: Email, Password: Password },
      function (err, foundUser) {
        if (err) {
          res.send({ status: false, data: 'you havenot registered' });
        } else if (foundUser) {
          const id = foundUser._id;
          const Name = foundUser.Name;
          console.log('an user loginned');
          req.session.role = 'user';
          const payload = { subject: Email, admin: false };
          const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
          res.send({ status: true, token, Name, id, role: req.session.role });
        } else {
          res.send(false);
        }
      }
    );
  })
);

//***************************    resets  student password   *************************/
router.put(
  '/reset',
  wrapAsync(async (req, res) => {
    // console.log(req.body);
    const { Email, Password } = req.body;
    const student = await Student.findOneAndUpdate(Email, { Password });
    if (student) {
      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);

//***************************    Getting all student      *************************/

router.get(
  '',
  wrapAsync(async (req, res) => {
    const results = await Student.find({});
    if (results) {
      res.send(results);
    } else {
      res.send(false);
    }
  })
);

//***************            student fetching By Id      ***********************/

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json({
        status: true,
        data: student,
      });
    } else {
      res.status(404).json({
        status: false,
        data: 'cannot find',
      });
    }
  })
);

//************************        profile update        ******************************/
router.put(
  '/:id',

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body.Student);
    const student = await Student.findByIdAndUpdate(id, {
      ...req.body.Student,
    });
    if (student) {
      return res.send({ status: true });
    } else {
      return res.send({ status: false });
    }
  })
);

//*******************           profiel photo update          ***********************/
router.put(
  '/:id/profilepic',

  upload.single('img'),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(req.file);
    const updatedimage = await Student.updateOne(
      { _id: id },
      {
        $set: {
          image: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image',
          },
        },
      }
    );
    if (updatedimage) {
      return res.send({ status: true });
    } else {
      return res.send({ status: false });
    }
  })
);

//*************************    delete the student profile     *************************/

router.delete(
  '/:id',

  wrapAsync(async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      return res.status(200).send(true);
    } else {
      return res.send(false);
    }
  })
);

// ********************       Mail sends on approving               ***************
router.post(
  '/:id/approve',

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { Email, Course } = req.body.Student;
    console.log(req.body.Student);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'projectjads@gmail.com',
        pass: 'sinan@66A',
      },
    });
    const mailOptions = {
      from: 'projectjads@gmail.com',
      to: `${Email}`,
      subject: `You Selected`,
      html: `<p>you are receiving this email because ictak approved your request</p>
      <br />
      <p>for joining the course ${Course}</p><br />
      <p>To complete the registration process Please click on the following link to pay the tution fee for the program</p>
      <br />`,
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // console.log("there is an error", err);
        return res.send({ status: false });
      } else {
        // console.log("here is the res", response);
        return res.send({ status: true });
      }
    });
  })
);

// ********************       Mail sends on rejecting               ***************
router.post(
  '/:id/reject',

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { Course, Email } = req.body.Student;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'projectjads@gmail.com',
        pass: 'sinan@66A',
      },
    });
    const mailOptions = {
      from: 'projectjads@gmail.com',
      to: `${Email}`,
      subject: `Application Rejected`,
      html: `<p>you are receiving this email because ictak rejected your request</p>
      <br />
      <p>for joining the Course ${Course} due to lack of clarification of details on application
      </p> `,
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log('there is an error', err);
        return res.send(false);
      } else {
        console.log('here is the res', response);
        return res.send(true);
      }
    });
  })
);

module.exports = router;
