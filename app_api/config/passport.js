var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var s = mongoose.model('Student');
var t = mongoose.model('Teacher');

passport.use(new LocalStrategy({

		usernameField: 'email'
	},
	function(username, password, done) {

		var checkUser = new Array(2);
		var checkPassword = new Array(2);

		s.findOne({email: username}, function(err, student){
			checkUser[0] = false;
			checkPassword[0] = false;
			//console.log('checking for students');
			if(err) { 
				return done(err);
			}
			/*if(!student) {
				checkUser[0] = false;
				return;
			}
			if(!student.validPassword(password)) {
				checkPassword[0] = false;
				return;
			}
			return done(null, student);*/

			if(!student) {
				//console.log('no student found');
				checkUser[0] = false;
			}
			if(student) {
				checkUser[0] = true;
				if(student.validPassword(password)) {
					//console.log('student password found');
					checkPassword[0] = true;
					return done(null, student);
				}
				//console.log('no student password found');
			}




			t.findOne({email: username}, function(err, teacher){
				checkUser[1] = false;
				checkPassword[1] = false;
				//console.log('checking for teachers');
				if(err) { 
					return done(err);
				}
				/*if(!teacher) {
					checkUser[1] = false;
					return;
				}
				if(!teacher.validPassword(password)) {
					checkPassword[1] = false;
					return;
				}
				return done(null,teacher);*/

				if(!teacher) {
					console.log('no teacher found');
					checkUser[1] = false;
				}
				if(teacher) {
					checkUser[1] = true;
					if(teacher.validPassword(password)) {
						console.log('teacher password found');
						checkPassword[1] = true;
						return done(null, teacher);						return done(null, teacher);
					} 
						//console.log('teacher password not found');
						checkPassword[1] = false;
				}

				if(checkUser[0] == false && checkUser [1] == false) {
					return done(null, false, {
						message:'Incorrect username.'
					}); 
				} else if(checkPassword[0] == false && checkPassword[1] == false) {
					return done(null, false, {
						message:'Incorrect password.'
					}); 				
				}
			});
		});
		
	}
));