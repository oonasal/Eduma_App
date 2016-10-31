//an angular service to save and read a JWT in local storage
//for managing a user session
(function() {
	angular
	.module('edumaApp')
	.service('authentication', authentication);

	authentication.$inject = ['$http', '$window'];
	function authentication($http, $window) {

		console.log('called authentication service');

		//saves a value to localStorage
		var saveToken = function(token) {
			$window.localStorage['eduma-token'] = token;
		};

		//gets a value from localStorage
		var getToken = function() {
			return $window.localStorage['eduma-token'];
		};

		//checking user role before registering them
		register = function(user) {
			//console.log('Registering user.');
			//console.log('role: ' + user.role);
			var role = user.role;
			if(role === "teacher") {
				//registerTeacher(user);
				return $http.post('/api/users/register/teachers', user).success(function(data){
		    		saveToken(data.token);
		  		});
			} else {
				return $http.post('/api/users/register/students', user).success(function(data){
				    saveToken(data.token);
				  });
			}
		};

		//calling the API to register teachers
		/*registerTeacher = function(teacher) {
			console.log('Registering teacher.');
		  return $http.post('/api/users/register/teachers', teacher).success(function(data){
		    saveToken(data.token);
		  });
		};*/

		//calling the API to register students
		/*registerStudent = function(student) {
			console.log('Registering student.');
		  return $http.post('/api/users/register/students', student).success(function(data){
		    saveToken(data.token);
		  });
		};*/

		//checking user role before logging them in
		login = function(user) {
			//console.log('Logging in user.');
			var role = user.role;
			if(role === "teacher") {
				//loginTeacher(user);
				return $http.post('/api/users/login/teachers', user).success(function(data) {
				    saveToken(data.token);
				  });
			} else {
				//loginStudent(user);
				return $http.post('/api/users/login/students', user).success(function(data) {
				    saveToken(data.token);
				  });
			}
		};

		//calling the API to login teacher
		/*loginTeacher = function(teacher) {
		  console.log('Logging in teacher.');
		  return $http.post('/api/users/login/teachers', teacher).success(function(data) {
		    saveToken(data.token);
		  });
		};*/

		//calling the API to login student
		/*loginStudent = function(student) {
			console.log('Logging in student.');
		  return $http.post('/api/users/login/students', student).success(function(data) {
		    saveToken(data.token);
		  });
		};*/

		//logging out -- removes the JWT from the localStorage
		logout = function() {
  			$window.localStorage.removeItem('eduma-token');
		};

		//checking if a user is logged in
		var isLoggedIn = function() {
			var token = getToken();

			//if token exists get its payload, decode it and parse it to JSON
			if(token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				
				//check whether the expiry date has passed and return the result
				return payload.exp > Date.now() / 1000;
			} else {
				return false; //no token
			}
		};

		//getting user information from the JWT.
		//checks if the user is logged in, gets the token, extracts
		//and decodes the payload and returns the needed data (in this case email and name)
		var currentUser = function() {
			//console.log('called currentUser method');
		  if(isLoggedIn()){
		    var token = getToken();
		    var payload = JSON.parse($window.atob(token.split('.')[1]));
		    
		    //console.log('payload email: ' + payload.email);
		    //console.log('payload firstname: ' + payload.firstname);

		    return {
		      email : payload.email,
		      firstname : payload.firstname,
		      lastname : payload.lastname
		    };
		  }
		};


		//checking current user's user role (teacher or student)
		/*var userRole = function() {
			console.log('Checking user role');
		  if(isLoggedIn()){
		    var token = getToken();
		    var payload = JSON.parse($window.atob(token.split('.')[1]));
		    console.log('Current user is a ' + payload.role);
		    return {
		      role : payload.role
		    };
		  }
		};*/

		//exposes the methods to the application
		return {
		  currentUser : currentUser,
	      saveToken : saveToken,
	      getToken : getToken,
	      isLoggedIn : isLoggedIn,
	      //registerTeacher : registerTeacher,
	      //registerStudent : registerStudent,
	      //loginTeacher : loginTeacher,
	      //loginStudent : loginStudent,
	      logout : logout,
	      //userRole : userRole,
	      login : login,
	      register : register
		};
	}
})();



//this file is referred to in appClientFiles array in app.js