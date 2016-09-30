var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var s = mongoose.model('Student');
var t = mongoose.model('Teacher');

passport.use(new LocalStrategy({
		usernameField: 'username'
	},
	function(username, password, done){
		var checkUser = new Array(2);
		var checkPassword = new Array(2);
		s.findOne({username:username}, function(err, s){
			if(err){ return done(err);}
			if(!s){
				// return done(null,false,{
				// 	message:'Incorrect username.'
				// });
				checkUser[1] = false;
				return;
			}
			if(!s.validPassword(password)){
				// return done(null,false, {
				// 	message:'Incorrect password.'
				// });
				checkPassword[1] = false;
				return;
			}
			return done(null,s);
		});

		t.findOne({username:username}, function(err, t){
			if(err){ return done(err);}
			if(!t){
				return done(null,false,{
					message:'Incorrect username.'
				});
				checkUser[2] = false;
				return;
			}
			if(!t.validPassword(password)){
				return done(null,false, {
					message:'Incorrect password.'
				});
				checkPassword[2] = false;
				return;
			}
			return done(null,t);
		});

		if(checkUser[1] == false && checkUser [2] == false){
			return done(null,false,{
					message:'Incorrect username.'
				}); 
		} else if(checkPassword[1] == false && checkPassword[2] == false){
			return done(null,false,{
					message:'Incorrect password.'
				}); 				
		}
	}
));