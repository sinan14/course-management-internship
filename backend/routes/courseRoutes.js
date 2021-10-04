const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken } = require('../middleware');

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);
router
  .route('/:id')
  .get(courseController.showCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
