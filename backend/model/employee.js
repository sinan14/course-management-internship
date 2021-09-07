const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
  },
  Phone: {
    type: String,
  },
  Gender: {
    type: String,
  },
  DOB: {
    type: Date,
  },

  HighestQualification: {
    type: String,
  },
  SkillSet: {
    type: String,
  },

  State: {
    type: String,
  },
  District: {
    type: String,
  },
  Post: {
    type: String,
  },

  PinCode: {
    type: Number,
  },
  Password: {
    type: String,
  },
  PassOfYear: {},
  CreationDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
