const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://team3:team3@cluster0.6iuwn.mongodb.net/TrainerManagement?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true });
const Schema = mongoose.Schema;
const AllocatedSchema = new Schema({
    id:String,
    fname:String,
    lname: String,
    email:String,
    startdate :String,
    enddate:String,
    time:String,
    course:String,
    courseid:String,
    batchid:String,
    meetinglink:String

});
var allocateddata = mongoose.model('allocateddata', AllocatedSchema);
module.exports = allocateddata;