var mongoose = require('mongoose');

var t = mongoose.model('Teacher');
//var s = mongoose.model('Student'); //not created yet

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.readTeachers = function (req, res) {
	//change this to actual data
	sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.readOneTeacher = function (req, res) {
	//change this to actual data
	//sendJsonResponse(res, 200, {"status" : "success"});

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
	//change this to actual data
	sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.removeTeacher = function (req, res) {
	//change this to actual data
	sendJsonResponse(res, 200, {"status" : "success"});
};
