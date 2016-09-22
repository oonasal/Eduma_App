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
	sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.addTeacher = function (req, res) {
	//change this to actual data
	sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.removeTeacher = function (req, res) {
	//change this to actual data
	sendJsonResponse(res, 200, {"status" : "success"});
};
