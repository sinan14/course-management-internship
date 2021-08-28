const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const multer = require("multer");
const ImageDataURI = require("image-data-uri");
const searchRouter = express.Router();
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

searchRouter.get("/:name", (req, res) => {
  //console.log(req.params);
  var regex = new RegExp(req.params.name, "i");
  trainerdata
    .find({ $or: [{ fname: regex }, { lname: regex }] })
    .then((data) => {
      res.send(data);
    });
});
searchRouter.get("/course/:course", (req, res) => {
  //console.log(req.params);
  var regex = new RegExp(req.params.course, "i");
  trainerdata.find({ course: regex }).then((data) => {
    res.send(data);
  });
});
searchRouter.get("/skill/:skill", (req, res) => {
  //console.log(req.params);

  var regex = new RegExp(req.params.skill, "i");
  trainerdata.find({ skill: regex }).then((data) => {
    res.send(data);
  });
});
searchRouter.get("/type/:typeemp", (req, res) => {
  //console.log(req.params);
  var regex = new RegExp(req.params.typeemp, "i");
  trainerdata.find({ typeemp: regex }).then((data) => {
    res.send(data);
  });
});
searchRouter.get("/all/:searchText", function (req, res) {
  const { searchText } = req.params;
  var regex = new RegExp(searchText, "i");
  trainerdata
    .find({
      $and: [
        {
          $or: [
            { fname: regex },
            { lname: regex },
            { skillset: regex },
            { course: regex },
            { typeemp: regex },
          ],
        },
        // { approved: true },
      ],
    })
    .then(function (trainers) {
      res.send(trainers);
    });
});
module.exports = searchRouter;
