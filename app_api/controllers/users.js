var mongoose = require('mongoose');

var t = mongoose.model('Teacher');
var s = mongoose.model('Student');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


//TEACHERS

module.exports.readTeachers = function (req, res) {
	t.find().exec(function(err, teachers){
		if (err) {
    		console.log('Error:', err);
    		sendJsonResponse(res, 404, err);
    		return;
    	} else {
    		sendJsonResponse(res, 200, teachers);
    	}
	});
};

module.exports.readOneTeacher = function (req, res) {
	if(req.params && req.params.teacherid) {
		t.findById(req.params.teacherid).exec(function(err, teacher) {
	        //if teacher is not returned
	        if(!teacher) {
	        	sendJsonResponse(res, 404, {
	        		"message": "teacherid not found"
	        	});
	        	return;
	        //if error message is returned
	    	} else if(err) {
	    		sendJsonResponse(res, 404, err);
	    		return;
	   		}
	    	sendJsonResponse(res, 200, teacher);
	    });
	} else {
		sendJsonResponse(res, 404, {
			"message": "No teacherid in request"
		});
	}
};

module.exports.addTeacher = function (req, res) {
	t.create({
		firstName: req.body.firstName,
  		lastName: req.body.lastName,
  		title: req.body.title,
  		location: req.body.location,
  		summary: req.body.summary,
  		experience: req.body.experience
    }, function(err, teacher) {
    	if(err) {
    		sendJsonResponse(res, 400, err);
    	} else {
    		sendJsonResponse(res, 201, teacher);
    	}
    });
};

module.exports.removeTeacher = function (req, res) {
	var teacherid = req.params.teacherid;
	if(req.params && teacherid) {
		t.findByIdAndRemove(teacherid).exec(function(err, teacher) {
	        if(err) {
	        	sendJsonResponse(res, 404, err);
	        	return;
	    	}
	    	console.log("Removing teacher.");
	    	sendJsonResponse(res, 204, null);
	    });
	} else {
		sendJsonResponse(res, 404, {
			"message": "No teacherid in request"
		});
	}
};


//STUDENTS

module.exports.readStudents = function (req, res) {
	s.find().exec(function(err, students){
		if (err) {
    		console.log('Error:', err);
    		sendJsonResponse(res, 404, err);
    		return;
    	} else {
    		sendJsonResponse(res, 200, students);
    	}
	});
};

module.exports.readOneStudent = function (req, res) {
	if(req.params && req.params.studentid) {
		s.findById(req.params.studentid).exec(function(err, student) {
	        if(!student) {
	        	sendJsonResponse(res, 404, {
	        		"message": "studentid not found"
	        	});
	        	return;
	    	} else if(err) {
	    		sendJsonResponse(res, 404, err);
	    		return;
	   		}
	    	sendJsonResponse(res, 200, student);
	    });
	} else {
		sendJsonResponse(res, 404, {
			"message": "No studentid in request"
		});
	}
};

module.exports.addStudent = function (req, res) {
	s.create({
		firstName: req.body.firstName,
  		lastName: req.body.lastName,
  		title: req.body.title,
  		location: req.body.location,
  		age: req.body.age,
  		summary: req.body.summary
    }, function(err, student) {
    	if(err) {
    		sendJsonResponse(res, 400, err);
    	} else {
    		sendJsonResponse(res, 201, student);
    	}
    });
};

module.exports.removeStudent = function (req, res) {
	var studentid = req.params.studentid;
	if(req.params && studentid) {
		t.findByIdAndRemove(studentid).exec(function(err, student) {
	        if(err) {
	        	sendJsonResponse(res, 404, err);
	        	return;
	    	}
	    	console.log("Removing student.");
	    	sendJsonResponse(res, 204, null);
	    });
	} else {
		sendJsonResponse(res, 404, {
			"message": "No studentid in request"
		});
	}
};
