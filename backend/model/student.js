const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Suid: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Phone: {
    type: String,
    // unique: true,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  SkillSet: {
    type: String,
  },
  HighestQualification: {
    type: String,
    required: true,
  },

  PassOfYear: {
    type: Number,
    required: true,
  },
  EmploymentStatus: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  Post: {
    type: String,
    required: true,
  },

  PinCode: {
    type: Number,
    required: true,
  },

  Password: {
    type: String,
  },
  CreationDate: {},
  ApprovalDate: {},
  PaymentDate: {},
  Status: {
    type: String,
    required: true,
  },
  ExitExamMark: {type:Number},
});

module.exports = mongoose.model("Student", StudentSchema);

// StudentSchema.statics.hashPassword = function hashPassword(Password) {
//   return bcrypt.hashSync(Password, 10);
// };

// StudentSchema.methods.isValid = function(hashedpassword){
//   return bcrypt.compareSync(hashedpassword, this.Password);
// }

// StudentSchema.statics.findAndValidate = async function (Email, Password) {
//   const foundUser = await this.findOne({ Email,Password });
// const isValid = await bcrypt.compare(Password, foundUser.Password);
//   if (foundUser) {
//     return foundUser;
//   } else {
//     return false;
//   }
// };

// StudentSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) return next();
//   this.Password = await bcrypt.hash(this.Password, 10);
//   next();
// });
