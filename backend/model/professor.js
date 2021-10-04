const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const professorSchema = new Schema({
  fname: String,
  lname: String,
  address: String,
  email: String,
  phno: String,
  qual: String,
  skill: String,
  comp: String,
  desgn: String,
  course: String,
  Gender: String,
  DOB: Date,
  State: String,
  District: String,
  Post: String,
  PinCode: Number,
  Password: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});
var Professor = mongoose.model('Professor', professorSchema);
module.exports = Professor;
