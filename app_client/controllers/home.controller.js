(function () {

  angular
    .module('edumaApp')
    .controller('homeCtrl', homeCtrl);

  //homeCtrl.$inject = ['$scope', 'edumaData'];
  //function homeCtrl ($scope) {
  //function homeCtrl ($scope, edumaData) {
  homeCtrl.$inject = ['$location', 'authentication', 'edumaData', '$http'];
  function homeCtrl($location, authentication, edumaData, $http) {

    //console.log('called homeCtrl');
    

    var vm = this;
    /*vm.currentUser = {
      firstname : "",
      lastname : "",
      email : ""

    };*/

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    //get the current user's info from the JWT
    vm.currentUser = authentication.currentUser();

    //console.log('current user: ' + vm.currentUser.firstname);

    //binding data to non-existent header as an example
    /*vm.pageHeader = {
      title: 'Eduma',
      strapline: 'Connecting teachers and students'
    };*/

    vm.logout = function() {
      authentication.logout();
      $location.path('/login');
    };

    vm.teachers = [];


    $http.get('/api/users/teachers').then(function(d) {
      console.log('data: ' + d);
      console.log('teachers: ' + d.data[0]);
      console.log('teachers: ' + d.data);
      //console.log('teachers: ' + d.data.firstname);
      //console.log('teachers: ' + d.data[0].firstname);
      vm.teachers = d.data;
      //findCurrentTeacher();
      //findCurrentTeacher();
      findCurrentTeacher();

    }, function(err) {
      console.log(err);
    })

    var teacherCount = 0;
    vm.currentTeacher = {
      firstname : "",
      lastname : "",
      summary : "",
      email : "",
      age : "",
      location : ""
    }

    function findCurrentTeacher() {
      console.log('teacher: ' + vm.teachers[teacherCount].firstname);
      console.log('teacher: ' + vm.teachers[teacherCount].lastname);
      console.log('teacher summary: ' + vm.teachers[teacherCount].summary);
      console.log('teacher email: ' + vm.teachers[teacherCount].email);
      
      
      
      

      vm.currentTeacher = {
        firstname : vm.teachers[teacherCount].firstname,
        lastname : vm.teachers[teacherCount].lastname,
        summary : vm.teachers[teacherCount].summary,
        email : vm.teachers[teacherCount].email,
        age : vm.teachers[teacherCount].age,
        location : vm.teachers[teacherCount].location
      };

      if(teacherCount === vm.teachers.length) {
        console.log('running out of teachers!');
        teacherCount = 0;
      } else {
        console.log('teacherCount: ' + teacherCount);
        teacherCount++;
      }

    }

    vm.skipTeacher = function() {
      console.log('skipping teacher');
      findCurrentTeacher();
    }

    // Nasty IE9 redirect hack (not recommended)
    /*if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    };
    vm.message = "Checking your location";

    vm.getData = function (position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      loc8rData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
    */


  }

})();