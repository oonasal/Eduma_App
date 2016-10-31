var express = require('express');
var router = express.Router();

//CHECK
/*
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
*/

//requiring the express-jwt module and setting it up.
//setup defines the secret and the property to be added to the 
//req object (holds the payload).
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

/*var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};*/

//CHECK
/*
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
*/

//include API controller files
var ctrlCourses = require('../controllers/courseControllers');
var ctrlTeachers = require('../controllers/teacherControllers');
var ctrlStudents = require('../controllers/studentControllers');
var ctrlAuth = require('../controllers/authentication');

//adding auth to the routes to require authentication for 
//certain methods:

//teachers:
router.get('/users/teachers', ctrlTeachers.readTeachers);
router.get('/users/teachers/:teacherid', auth, ctrlTeachers.readOneTeacher);
router.delete('/users/teachers/:teacherid', auth, ctrlTeachers.removeTeacher);

//students:
router.get('/users/students', auth, ctrlStudents.readStudents);
router.get('/users/students/:studentid', auth, ctrlStudents.readOneStudent);
router.delete('/users/students/:studentid', auth, ctrlStudents.removeStudent);

// Courses
router.post('/:teacherid/courses/create', auth, ctrlCourses.createCourseHandler); // register course
router.get('/:courseid', auth, ctrlCourses.getCourseHandler); // view course
router.post('/requestcourse/:studentid/:courseid', auth, ctrlCourses.requestCourseHandler); // student request courses

//authentication
router.post('/users/register/teachers', ctrlAuth.registerTeachersHandler);
router.post('/users/login/teachers', ctrlAuth.loginTeachersHandler);
router.post('/users/register/students', ctrlAuth.registerStudentsHandler);
router.post('/users/login/students', ctrlAuth.loginStudentsHandler);



//FIX OR DELETE
//Log out button
//router.post('/logout', logoutHandler);

/*var logoutHandler = function(req, res){
    var token = "";
    sendJsonResponse(res, 200, token);
};*/


//PROBABLY DELETE
//reviews:
//router.get('/users/teachers/:teacherid/reviews', ctrlUsers.readTeacherReviews);
//router.get('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.readOneTeacherReview);
//router.post('/users/teachers/:teacherid/reviews', ctrlUsers.addTeacherReview);
//router.delete('/users/teachers/:teacherid/reviews/:reviewid', ctrlUsers.removeTeacherReview);

//courses:
//router.get('/courses', ctrlCourses.readCourses);
//router.get('/courses/:courseid', ctrlCourses.readOneCourse);

//requests:
//router.get('/courses/:courseid/requests', ctrlCourses.readCourseRequests);
//router.get('/courses/:courseid/requests/:requestid', ctrlCourses.readOneCourseRequest);
//router.post('/courses/:courseid/requests', ctrlCourses.addCourseRequest);
//router.delete('/courses/:courseid/requests/:requestid', ctrlCourses.removeCourseRequest);


module.exports = router;

