var express = require('express');
var router = express.Router();

//include API controller files
var ctrlCourses = require('../controllers/courses');
var ctrlUsers = require('../controllers/users');

//define API routes:
//uncomment when you've added models and api controllers 
//for courses etc.

//courses:
//router.get('/courses', ctrlCourses.readCourses);
//router.get('/courses/:courseid', ctrlCourses.readOneCourse);

//requests:
//router.get('/courses/:courseid/requests', ctrlCourses.readCourseRequests);
//router.get('/courses/:courseid/requests/:requestid', ctrlCourses.readOneCourseRequest);
//router.post('/courses/:courseid/requests', ctrlCourses.addCourseRequest);
//router.delete('/courses/:courseid/requests/:requestid', ctrlCourses.removeCourseRequest);

//teachers:
router.get('/users/teachers', ctrlUsers.readTeachers);
router.get('/users/teachers/:teacherid', ctrlUsers.readOneTeacher);
router.post('/users/teachers', ctrlUsers.addTeacher);
router.delete('/users/teachers/:teacherid', ctrlUsers.removeTeacher);

//reviews:
//router.get('/users/teachers/:teacherid/reviews', ctrlUsers.readTeacherReviews);
//router.get('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.readOneTeacherReview);
//router.post('/users/teachers/:teacherid/reviews', ctrlUsers.addTeacherReview);
//router.delete('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.removeTeacherReview);

//students:
//router.get('/users/students', ctrlUsers.readStudents);
//router.get('/users/students/:studentid', ctrlUsers.readOneStudent);
//router.post('/users/students', ctrlUsers.addStudent);
//router.delete('/users/students/:studentid', ctrlUsers.removeStudent);

module.exports = router;
