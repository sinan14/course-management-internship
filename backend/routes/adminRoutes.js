const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const multer = require("multer");
const ImageDataURI = require("image-data-uri");
const adminRouter = express.Router();
const userdata = require("../model/userdata");
const allocateddata = require("../model/allocateddata");
const enrollmentdata = require("../model/enrollmentdata");
const trainerdata = require("../model/trainerdata");
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/images/requests");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

adminRouter.post("/login", function (req, res) {
  // res.status(200);
  admin = req.body.admin;
  //console.log(admin);
  if (
    !(admin.adminemail === "admin@gmail.com" && admin.adminpass === "admin@123")
  ) {
    res.status(401).send("Invalid Login");
  } else {
    //console.log("successful login");
    // res.status(200);

    let payload = { subject: adminemail + password };
    let token = jwt.sign(payload, "secretKey");
    res.status(200).send({ token,email:admin.adminemail });
  }
});

//number to show in dashboard
adminRouter.get("/trainers/getnumbers", (req, res) => {
  var numbers = [];
  enrollmentdata.countDocuments().then((no) => {
    numbers.push(no);
    allocateddata.countDocuments().then((no) => {
      numbers.push(no);
      trainerdata.countDocuments().then((no) => {
        numbers.push(no);
        //console.log(numbers);
        res.send(numbers);
      });
    });
  });
});

//total requests
adminRouter.get("/trainers/requests", function (req, res) {
  enrollmentdata.find().then(function (requests) {
    res.send(requests);
  });
});
adminRouter.get("/trainers/requests/:email", (req, res) => {
  const Email = req.params.email;
  enrollmentdata.findOne({ email: Email }).then((request) => {
    //console.log("approve request " + request);
    res.send(request);
  });
});

adminRouter.post(
  "/trainers/requests/:email/approve",
  async function (req, res) {
    //console.log(req.body);
    var fname = req.body.fname;
    var typeemp = req.body.typeemp;
    var id =
      fname.toUpperCase() +
      "_" +
      typeemp.toUpperCase().substr(0, 3) +
      "_" +
      Math.random().toString(36).substr(2, 9).toUpperCase();
    var approvedList = {
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      email: req.body.email,
      phno: req.body.phno,
      qual: req.body.qual,
      skill: req.body.skill,
      comp: req.body.comp,
      desgn: req.body.desgn,
      course: req.body.course,
      img: req.body.img,
      typeemp: req.body.typeemp,
      id: id,
    };

    //console.log("approvedList " + approvedList);
    var approvedList = new trainerdata(approvedList);
    approvedList.save();
    // const traineremail = await enrollmentdata.findOne({
    //   email: approvedList.email,
    // });

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ictakproject@gmail.com",
        pass: "ahngshycdtwaagvc",
      },
    });

    var mailOptions = {
      from: "ictakproject@gmail.com",
      to: approvedList.email,
      subject: "You are Approved as an ICT Trainer",
      text: `Congratulations ${approvedList.fname}  ${approvedList.lname}.Thank you for being a part of ICT Trainers.You are approved as ${approvedList.typeemp}  Trainer for course ${approvedList.course} and your ID is ${approvedList.id}.
    
    Please contact us regarding any query.

    Thanks and Regards,
    ICTAK TEAM
    `,
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        //console.log(error + " error in senting email");
      } else {
        //console.log("email sent " + info.response);
      }
    });
    enrollmentdata.findOneAndDelete({ email: approveListemail }).then(() => {
      //console.log("successfully deleted from enrollment list");
      res.send();
    });
  }
);

// reject an application
adminRouter.delete("/trainers/requests/:email/reject", (req, res) => {
  const Email = req.params.email;
  enrollmentdata.findOneAndDelete({ email: Email }).then(() => {
    //console.log("rejected a trainer request");
    res.send();
  });
});
//delete a apporved trainer
adminRouter.delete("/trainers/:email/remove", (req, res) => {
  Email = req.params.email;
  // trainerdata.findOne({ email: email }).then((data) => {
  //   email = data.email;
  // });
  trainerdata.findOneAndDelete({ email: Email }).then(() => {
    allocateddata.findOneAndDelete({ email: Email }).then(() => {
      //console.log("removed a trainer ");
      res.send();
    });
  });
});

adminRouter.post("/trainers/:email/allocate", async (req, res) => {
  //console.log('allocated data '+req.body)
  var allocatedlist = {
    id: req.body.id,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    course: req.body.course,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    time: req.body.time,
    courseid: req.body.courseid,
    batchid: req.body.batchid,
    meetinglink: req.body.meetinglink,
  };

  var allocatedlist = new allocateddata(allocatedlist);
  allocatedlist.save((err, result) => {
    if (err) {
      res.send(false);
    }
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ictakproject@gmail.com",
        pass: "ahngshycdtwaagvc",
      },
    });

    var mailOptions = {
      from: "ictakproject@gmail.com",
      to: allocatedlist.email,
      subject: "ICT Trainer Schedule ",
      text: `Hi ${allocatedlist.fname}  ${allocatedlist.lname} ,You are assigned for the course ${allocatedlist.course}.The details are
        Start Date:${allocatedlist.startdate},
        End Date: ${allocatedlist.enddate},
        Time:${allocatedlist.time},
        Course Id: ${allocatedlist.courseid},     
        Batch Id: ${allocatedlist.batchid},
        Meeting Link: ${allocatedlist.meetinglink}
        Please contact us regarding any query.
        Thanks and Regards,
        ICTAK TEAM
        `,
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        //console.log(error + " error in senting email");
        res.send(false);
      } else {
        //console.log("email sent " + info.response);
        res.send({ status: true });
      }
    });
  });
});

//allocated list of all
adminRouter.get("/trainers/allocatedList", function (req, res) {
  allocateddata
    .find()
    .then((trainer) => {
      res.send(trainer);
    })
    .catch((err) => {
      res.send(false);
    });
});

module.exports = adminRouter;
