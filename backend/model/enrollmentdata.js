const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnrollmentSchema = new Schema({
  fname:String,
  lname: String,
  address: String,
  email: String,
  phno: String,
  qual:String,
  skill: String,
  comp: String,
  desgn: String,
  course: String,
  img: String
});
var enrollmentdata = mongoose.model('enrollmentdata', EnrollmentSchema);
module.exports = enrollmentdata;