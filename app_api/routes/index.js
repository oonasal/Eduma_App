var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
});

router.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

router.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

router.use(flash());

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
router.post('/users/register/teachers', ctrlUsers.registerTeachersHandler);
router.post('/users/login/teachers',ctrlUsers.loginTeacherHandler);
router.get('/users/teachers',ctrlUsers.readTeachers);
router.get('/users/teachers/:teacherid',ctrlUsers.readOneTeacher);
//router.post('/users/teachers', ctrlUsers.addTeacher);
router.delete('/users/teachers/:teacherid',ctrlUsers.removeTeacher);

//reviews:
//router.get('/users/teachers/:teacherid/reviews', ctrlUsers.readTeacherReviews);
//router.get('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.readOneTeacherReview);
//router.post('/users/teachers/:teacherid/reviews', ctrlUsers.addTeacherReview);
//router.delete('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.removeTeacherReview);

//students:
router.post('/users/register/students',ctrlUsers.registerStudentsHandler);
router.post('/users/login/students',ctrlUsers.loginStudentHandler);
router.get('/users/students',ctrlUsers.readStudents);
router.get('/users/students/:studentid',ctrlUsers.readOneStudent);
//router.post('/users/students', ctrlUsers.addStudent);
router.delete('/users/students/:studentid',ctrlUsers.removeStudent);

// Courses
router.post('/:teacherid/courses/create',ctrlCourses.createCourseHandler); // register course
router.get('/:teacherid/:courseid',ctrlCourses.getCourseHandler); // view course
router.post('/users/requestcourse/:courseid',ctrlCourses.requestCourseHandler); // student request courses 

module.exports = router;
