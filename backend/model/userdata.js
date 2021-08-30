const mongoose = require("mongoose");
// const dbUrl ="mongodb+srv://team3:team3@cluster0.6iuwn.mongodb.net/TrainerManagement?retryWrites=true&w=majority";


const Schema = mongoose.Schema;
const UserSchema = new Schema({
  useremail: String,
  username: String,
  password: String,
  role: String,
});
var userdata = mongoose.model("userdata", UserSchema);
module.exports = userdata;
