var mongoose = require('mongoose');
var t = mongoose.model('Teacher');
var c = mongoose.model('Course');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Create Course Handler
module.exports.createCourseHandler = function(req,res){
	var courseName = req.body.courseName;
	var category = req.body.category;
	var courseSummary = req.body.courseSummary;
	var requirement = req.body.requirement;
	var learningOutcome = req.body.learningOutcome;
	var teacher = req.params.teacherid;

	req.checkBody('courseName', 'courseName is required').notEmpty();
	req.checkBody('courseSummary', 'courseSummary is required').notEmpty();
	req.checkBody('learningOutcome', 'learningOutcome is required').notEmpty();
	req.checkBody('teacher', 'teacher is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		sendJsonResponse(res, 404, errors);
	} else {
		var newCourse = new c({
			courseName: courseName,
			category: category,
			courseSummary: courseSummary,
			requirement: requirement,
			learningOutcome: learningOutcome,
			teacher: teacher,
		});

		t.getTeacherById(teacher, function(err, teacher) {
			if (err) {sendJsonResponse(res, 404, err);}
			teacher.courses.push(newCourse);
			teacher.save();
		})

		c.createCourse(newCourse, function(err, course){
			if (err) {sendJsonResponse(res, 404, err);}
		});

		sendJsonResponse(res, 200, newCourse)
	}
}

// Getting Courses Handler
module.exports.getCourseHandler = function (req,res){
	if(req.params && req.params.courseid && req.params.teacherid) {
		c.findById(req.params.courseid).exec(function(err, course) {
		        	if(!course) {
			        	sendJsonResponse(res, 404, {
			        		"message": "studentid not found"
			        	});
		        		return;
		    	} else if(err) {
		    		sendJsonResponse(res, 404, err);
		    		return;
		   	}
		    	sendJsonResponse(res, 200, course);
	   	});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No courseid in request"
		});
	}
}