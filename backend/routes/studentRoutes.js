const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const jwt = require("jsonwebtoken");
const StudentData = require("../model/student");
const { verifyToken } = require("../middleware");
const nodemailer = require("nodemailer");
const multer = require("multer");
var imagedest = __dirname;
var upload = multer({ dest: imagedest });
const fs = require("fs");
const generator = require("generate-password");

//************************************************ */

router.post("/register", upload.single("img"), (req, res) => {
  // console.log(req.body);
  var Student = {
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
    Password: "NewRegister@ict",
    Suid: "New Register",

    image: {
      data: fs.readFileSync(req.file.path),
      contentType: "image",
    },
  };
  var student = StudentData(Student);
  student.save((err, result) => {
    if (err) {
      res.send({ status: false });
    }
    res.send({ status: true });
  });
});

//************************      checks login            ************************ */
router.post(
  "/login",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    const { Email, Password } = req.body;
    StudentData.findOne(
      { Email: Email, Password: Password },
      function (err, foundUser) {
        if (err) {
          res.send({ status: false, data: "you havenot registered" });
        } else if (foundUser) {
          const id = foundUser._id;
          const Name = foundUser.Name;
          console.log("an user loginned");
          req.session.role = "user";
          const payload = { subject: Email, admin: false };
          const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
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
  "/reset",
  wrapAsync(async (req, res) => {
    // console.log(req.body);
    const { Email, Password } = req.body;
    // const student = await StudentData.findOne(Email);
    const student = await StudentData.findOneAndUpdate(Email, { Password });
    if (student) {
      // await student.update({Password})
      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);

//***************************    Getting all student      *************************/

router.get(
  "",

  wrapAsync(async (req, res) => {
    const Students = await StudentData.find();
    if (Students) {
      res.send(Students);
    } else {
      res.send(false);
    }
  })
);

//***************            student fetching By Id      *****************************/

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const Student = await StudentData.findById(req.params.id);
    // console.log(Student)
    if (Student) {
      return res.send(Student);
    } else {
      return res.send(false);
    }
  })
);

//************************        profile update        ******************************/
router.put(
  "/:id",

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    console.log(req.body.Student);
    const Student = await StudentData.findByIdAndUpdate(id, {
      ...req.body.Student,
    });
    // console.log(Student);
    if (Student) {
      return res.send({ status: true });
    } else {
      return res.send({ status: false });
    }
  })
);

//*******************           profiel photo update          ***********************/
router.put(
  "/:id/profilepic",

  upload.single("img"),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(req.file);
    const updatedimage = await StudentData.updateOne(
      { _id: id },
      {
        $set: {
          image: {
            data: fs.readFileSync(req.file.path),
            contentType: "image",
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
  "/:id",

  wrapAsync(async (req, res) => {
    const deletedStudent = await StudentData.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      return res.status(200).send(true);
    } else {
      return res.send(false);
    }
  })
);

// ********************       Mail sends on approving               ***************
router.post(
  "/:id/approve",

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { Email, Course } = req.body.Student;
    console.log(req.body.Student);
    const awsLink = "http://ec2-18-219-147-180.us-east-2.compute.amazonaws.com";

    const link = `${awsLink}/students/${id}/pay`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "projectjads@gmail.com",
        pass: "sinan@66A",
      },
    });
    const mailOptions = {
      from: "projectjads@gmail.com",
      to: `${Email}`,

      subject: `You Selected`,

      html: `<p>you are receiving this email because ictak approved your request</p>
      <br />
      <p>for joining the course ${Course}</p><br />
      <p>To complete the registration process Please click on the following link to pay the tution fee for the program</p>
      <br />
      <p><b><a href="${link}">${link}</a></b></p>`,
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
  "/:id/reject",

  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { Course, Email } = req.body.Student;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "projectjads@gmail.com",
        pass: "sinan@66A",
      },
    });
    const mailOptions = {
      from: "projectjads@gmail.com",
      to: `${Email}`,
      subject: `Application Rejected`,
      html: `<p>you are receiving this email because ictak rejected your request</p>
      <br />
      <p>for joining the Course ${Course} due to lack of clarification of details on application
      </p> `,
    };
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        // console.log("there is an error", err);
        return res.send(false);
      } else {
        // console.log("here is the res", response);
        return res.send(true);
      }
    });
  })
);

//***************************          sends mail on accepting payment ***********/
router.put(
  "/:id/pay",
  wrapAsync(async (req, res) => {
    const password = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
    });
    const uuid = generator.generate({
      length: 6,
      numbers: true,
      uppercase: false,
    });
    const { id } = req.params;
    const { Course, Status, Email, PaymentDate } = req.body.Student;
    // console.log(Status);
    const studentPass = `1@${password}`;

    const firstrow = Course.slice(0, 4).toLowerCase();
    const first = firstrow.charAt(0).toUpperCase() + firstrow.slice(1);
    const suid = `${first}${uuid}`;
    // console.log(suid);
    // console.log(Email);
    // console.log(`your password is        ${studentPass}`);
    const student = await StudentData.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          Password: studentPass,
          Suid: suid,
          Status: Status,
          PaymentDate: PaymentDate,
        },
      }
    );

    if (!student) {
      // console.log("falseupdated123456");
      return res.send(false);
    } else {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: "projectjads@gmail.com",
          pass: "sinan@66A",
        },
      });
      const mailOptions = {
        from: "projectjads@gmail.com",
        to: `${Email}`,
        subject: `payment received`,

        html: `<p>you are receiving this email because ictak received the payment done by you for the course${Course}</p>
              <br />
              <p>now you can login to our site for details and to see your profile by using </p>
              <br />
              <p>password : <strong><b><em>${studentPass}</em></b></strong></p>
              <br />
              <p>your student id is : <b><em>${suid}</em></b></p>
              <br />
              <p>you can also reset your password in your profile too</p>`,
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          // console.log("there is an error", err);
          return res.send(false);
        } else {
          // console.log("here is the res", response);
          // console.log(student);
          return res.send(true);
        }
      });
    }
  })
);

module.exports = router;
