var mongoose = require('mongoose');

var t = mongoose.model('Teacher');
//var s = mongoose.model('Student'); //not created yet

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

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
