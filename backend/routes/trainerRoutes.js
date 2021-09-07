const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const ImageDataURI = require("image-data-uri");
const trainerRouter = express.Router();

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

trainerRouter.post("/signup", function (req, res) {
  trainer = req.body.trainer;
  var newuser = {
    useremail: trainer.traineremail,
    username: trainer.trainerusername,
    password: trainer.trainerpass,
    role: "normaluser",
  };
  userdata
    .findOne({ useremail: trainer.traineremail.trim() })
    .then(function (data) {
      // res.status(500).send("User already exixts")
      if (data === null) {
        var user = userdata(newuser);
        user.save();
        res.status(200).send();
      } else {
        //console.log("User already exixts");
        res.status(401).send(false);
      }
    });
});
trainerRouter.post("/signin", function (req, res) {
  res.status(200);
  trainer = req.body.trainer;
  userdata
    .findOne({ useremail: trainer.traineremail })
    .then(function (data) {
      if (data.password === trainer.trainerpass) {
        var payload = { subject: data.useremail };
        var token = jwt.sign(payload, "secretkey");
        res.status(200).send({ token, email: trainer.traineremail });
      } else {
        res.status(401).send("Invalid login");
      }
    })
    .catch((err) => {
      message = "failed";
      res.status(401).send({ message });
    });
});

trainerRouter.post("/enroll", (req, res) => {
  var upload = multer({ storage: storage }).single("img");

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      var item = {
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
        img: req.file.filename,
      };
    }
    var enrollment = new enrollmentdata(item);
    enrollment
      .save()
      .then((res) => {
        res.send(true);
      })
      .catch((err) => {
        res.send(false);
      });
  });
});

trainerRouter.get("/all", (req, res) => {
  trainerdata
    .find()
    .then((trainers) => {
      res.send(trainers);
    })
    .catch((err) => {
      res.send(false);
    });
});

trainerRouter.get("/:email/one", (req, res) => {
  const Email = req.params.email;
  trainerdata.findOne({ email: Email }).then((trainer) => {
    res.send(trainer);
  });
});
trainerRouter.post("/:email/edit", (req, res) => {
  //console.log(req.body.img);

  if (req.body.url !== "") {
    
    var imageName = `${req.body.email}_${req.body.img}`;
    ImageDataURI.outputFile(
      req.body.url,
      `public/images/requests/${imageName}`
    );
  } else {
    imageName = req.body.img;
  }

  trainerdata
    .updateMany(
      { email: req.body.email },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        phno: req.body.phno,
        qual: req.body.qual,
        skill: req.body.skill,
        comp: req.body.comp,
        desgn: req.body.desgn,
        img: imageName,
      }
    )
    .then((data) => {
      //console.log(data);
      res.status(200).send();
    })
    .catch((err) => {
      res.send(false);
    });
});

trainerRouter.get("/allocatedList/:email/schedule", function (req, res) {
  const Email = req.params.email;
  allocateddata
    .find({ email: Email })
    .then(function (data) {
      res.send(data);
    })
    .catch((err) => {
      res.send(false);
    });
});

trainerRouter.get("/allocatedList/:email/checkDates", (req, res) => {
  email = req.params.email;
  allocateddata
    .find({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(false);
    });
});

trainerRouter.get("/approvedList/:email/check", (req, res) => {
  //console.log(req.body.email);
  Email = req.params.email;
  trainerdata
    .findOne({ email: Email })
    .then((data) => {
      if (data) {
        res.send(true);
      }
    })
    .catch((err) => {
      res.send(false);
    });
});
module.exports = trainerRouter;
