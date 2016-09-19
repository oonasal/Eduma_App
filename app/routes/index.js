var express = require('express');
var router = express.Router();

//require the controller files
var ctrlCourses = require('../controllers/courses');
var ctrlUsers = require('../controllers/users');
var ctrlOthers = require('../controllers/others');

//define routes and map them to the controllers
//others:
router.get('/', ctrlOthers.edumaHome);
router.get('/about', ctrlOthers.about);
//courses:
router.get('/courses', ctrlCourses.courseList);
router.get('/courses/course-details', ctrlCourses.courseDetails); //do something with this
router.get('/courses/course-details/requests', ctrlCourses.courseRequests);
//users:
router.get('/users/teachers', ctrlUsers.teacherList);
router.get('/users/teachers/teacher-details', ctrlUsers.teacherDetails);
router.get('/users/teachers/teacher-details/reviews', ctrlUsers.teacherReviews);
router.get('/users/students/student-details', ctrlUsers.studentDetails);



module.exports = router;
