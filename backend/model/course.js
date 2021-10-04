const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title required'],
    unique: [true, 'title for each course must be unique'],
  },
  duration: {
    type: Number,
    required: [true, 'duration required'],
  },
  fee: {
    type: Number,
    required: [true, 'fee must be showed '],
  },
  ageLimit: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, 'description required'],
  },
});
module.exports = mongoose.model('Course', courseSchema);
