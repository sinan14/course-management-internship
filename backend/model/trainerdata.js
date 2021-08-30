const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TrainerSchema = new Schema({
  id:String,
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
  img: String,
  typeemp:String
});
var trainerdata = mongoose.model('trainerdata', TrainerSchema);
module.exports = trainerdata;