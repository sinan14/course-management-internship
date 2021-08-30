const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const AllocatedSchema = new Schema({
  id: String,
  fname: String,
  lname: String,
  email: String,
  startdate: String,
  enddate: String,
  time: String,
  course: String,
  courseid: String,
  batchid: String,
  meetinglink: String,
});
var allocateddata = mongoose.model("allocateddata", AllocatedSchema);
module.exports = allocateddata;
