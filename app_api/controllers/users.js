var mongoose = require('mongoose');
var t = mongoose.model('Teacher');
<<<<<<< HEAD
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

module.exports.registerStudentsHandler = function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var email = req.body.email;
	var title = req.body.title;
	var summary = req.body.summary;
	var age = req.body.age;

	// Validation, this should be implemented in frontend, but i did it here just for the demo test
	req.checkBody('firstname', 'Name is required').notEmpty();
	req.checkBody('lastname', 'Name is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('email', 'email is invalid').isEmail();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('password2', 'password does not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		console.log("ERRORS: REGISTER HANDLING, ", errors)
	} else {
		var newStudent = new s({
			firstName: firstname,
			lastName: lastname,
			username: username,
			password: password,
			email: email,
			title: title,
			summary: summary,
			age: age

		});

		s.createStudents(newStudent, function(err, user){
			if(err) {throw err;}
			console.log(user);
		});

		req.flash('You are now registered and can now logged in');

		res.redirect('../../../login');
	}
}	

module.exports.registerTeachersHandler = function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var email = req.body.email;
	var summary = req.body.summary;
	var experience = req.body.experience;
	var location = req.body.location;
	var rating = req.body.rating;
	var title = req.body.title;

	// Validation, this should be implemented in frontend, but i did it here just for the demo test
	req.checkBody('firstname', 'Name is required').notEmpty();
	req.checkBody('lastname', 'Name is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('email', 'email is invalid').isEmail();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('password2', 'password does not match').equals(req.body.password);
	req.checkBody('summary', 'summary is required').notEmpty();
	req.checkBody('experience', 'experience is required').notEmpty();



	var errors = req.validationErrors();

	if (errors) {
		console.log("ERRORS: REGISTER HANDLING, ", errors)
	} else {
		var newTeacher = new t({
			firstName: firstname,
			lastName: lastname,
			username: username,
			password: password,
			email: email,
			summary: summary,
			experience: experience,
			location: location,
			rating: rating,
			title: title
		});

		t.createTeachers(newTeacher, function(err, user){
			if(err) {throw err;}
			console.log(user);
		});

		req.flash('You are now registered and can now logged in');

		res.redirect('../../../login');
	}
}

module.exports.loginHandler = function(req, res) {
	passport.use(new LocalStrategy(
		function(username, password, done) {
			var checkUser = new Array(2);
			t.getTeacherByUsername(username, function(err, user) {
				if (err || !user) {
					checkUser[1] = false;
				} else {
					t.comparePassword(password, user.password, function(err, isMatch) {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Invalid password' });
						}
					});					
				}	
			});

			s.getStudentByUsername(username, function(err, user) {
				if (err || !user) {
					checkUser[2] = false
				} else {
					t.comparePassword(password, user.password, function(err, isMatch) {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Invalid password' });
						}
					});					
				}	
			});
			if (checkUser[1] == false && checkUser[2] == false) {
				return done(null, false, { message: 'Unknown User' });
			}
		}
	));

	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true})
	passport.serializeUser(function(user, done) {
 		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		t.getTeacherById(id, function(err, user) {
			done(err, user);
		});
	});


	res.redirect('/');
}

module.exports.logoutHandler = function(req,res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('../../login');
}
