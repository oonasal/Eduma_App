var passport = require('passport');
var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');
var Student = mongoose.model('Student');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//TEACHER

//register controller -- registering the user
module.exports.registerTeachersHandler = function(req, res) {
	//if name, email or password is missing from the request
	if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
		sendJsonResponse(res, 400, {
			"message": "All fields required."
		});
		return;
	}
	//create a new user and set their name, email and password (salt and hash)
	var teacher = new Teacher();
	teacher.firstname = req.body.firstname;
	teacher.lastname = req.body.lastname;
	teacher.email = req.body.email;
	teacher.setPassword(req.body.password);
	teacher.role = req.body.role;
	teacher.age = req.body.age;
	teacher.summary = req.body.summary;
	teacher.location = req.body.location;

	//save the user to the database
	teacher.save(function(err) {
		var token;
		if(err) {
			sendJsonResponse(res, 404, err);
		} else {
			//generate a JWT and send it to the browser
			token = teacher.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		}
	});
};

//login controller -- handling the authentication of the user
module.exports.loginTeachersHandler = function(req, res) {
	//if email or password is missing
	if(!req.body.email || !req.body.password) {
		sendJsonResponse(res, 400, {
			"message": "All fields required."
		});
		return;
	}

	//use passport's authentication method
	passport.authenticate('local', function(err, teacher, info) {
		var token;

		if(err) {
			sendJsonResponse(res, 404, err);
			return;
		}

		//if passport returned a user instance
		if(teacher) {

			//generate and send a JWT
			token = teacher.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		} else {
			//return info message (why authentication failed)
			sendJsonResponse(res, 401, info);
		}

	})(req, res); //making sure that req and res are available to passport
};


//STUDENT

//register controller -- registering the user
module.exports.registerStudentsHandler = function(req, res) {
	//if name, email or password is missing from the request
	if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.age) {
		sendJsonResponse(res, 400, {
			"message": "All fields required."
		});
		return;
	}
	//create a new user and set their name, email and password (salt and hash)
	var student = new Student();
	student.firstname = req.body.firstname;
	student.lastname = req.body.lastname;
	student.email = req.body.email;
	student.setPassword(req.body.password);
	student.age = req.body.age;
	student.role = req.body.role;
	student.summary = req.body.summary;
	student.location = req.body.location;


	//save the user to the database
	student.save(function(err) {
		var token;
		if(err) {
			sendJsonResponse(res, 404, err);
		} else {
			//generate a JWT and send it to the browser
			token = student.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		}
	});
};

//login controller -- handling the authentication of the user
module.exports.loginStudentsHandler = function(req, res) {
	//if email or password is missing
	if(!req.body.email || !req.body.password) {
		sendJsonResponse(res, 400, {
			"message": "All fields required."
		});
		return;
	}

	//use passport's authentication method
	passport.authenticate('local', function(err, student, info) {
		var token;

		if(err) {
			sendJsonResponse(res, 404, err);
			return;
		}

		//if passport returned a user instance
		if(student) {
			//generate and send a JWT
			token = student.generateJwt();
			sendJsonResponse(res, 200, {
				"token": token
			});
		} else {
			//return info message (why authentication failed)
			sendJsonResponse(res, 401, info);
		}

	})(req, res); //making sure that req and res are available to passport
};
