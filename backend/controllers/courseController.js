const Course = require('../model/course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    console.log(req.body);
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.showCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    // Course.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    console.log(req.body);
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body.course,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(course);
    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: 'successfully deleted',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
