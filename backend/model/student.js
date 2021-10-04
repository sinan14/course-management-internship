const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
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

  HighestQualification: {
    type: String,
    required: true,
  },

  PassOfYear: {
    type: Number,
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
});

module.exports = mongoose.model("Student", studentSchema);

// studentSchema.statics.hashPassword = function hashPassword(Password) {
//   return bcrypt.hashSync(Password, 10);
// };

// studentSchema.methods.isValid = function(hashedpassword){
//   return bcrypt.compareSync(hashedpassword, this.Password);
// }

// studentSchema.statics.findAndValidate = async function (Email, Password) {
//   const foundUser = await this.findOne({ Email,Password });
// const isValid = await bcrypt.compare(Password, foundUser.Password);
//   if (foundUser) {
//     return foundUser;
//   } else {
//     return false;
//   }
// };

// studentSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) return next();
//   this.Password = await bcrypt.hash(this.Password, 10);
//   next();
// });
