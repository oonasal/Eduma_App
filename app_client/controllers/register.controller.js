(function () {

  angular
    .module('edumaApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location','authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    /*vm.pageHeader = {
      title: 'Create a new Loc8r account'
    };*/

    //instantiate user info
    vm.userinfo = {
      firstname : "",
      lastname : "",
      email : "",
      password : "",
      role : "",
      location : "",
      age : "",
      summary : "",
      interest1 : "",
      interest2 : "",
      interest3 : ""
    };

    vm.returnPage = $location.search().page || '/login';

    //when the user clicks the submit button
    vm.onSubmit = function () {
      //vm.formError = "";
      if (!vm.userinfo.firstname || !vm.userinfo.lastname || !vm.userinfo.email || !vm.userinfo.password || !vm.userinfo.role) {
        //display an error on the form if name, email or password is missing
        //vm.formError = "All fields required, please try again";
        console.log('something was missing');
        console.log('first name: ' + vm.userinfo.firstname + ', last name: ' + vm.userinfo.lastname + ', email: ' + vm.userinfo.email + ', password: ' + vm.userinfo.password + ', role: ' + vm.userinfo.role + ', location: ' + vm.userinfo.location);
        return false;
      } else {
        console.log('first name: ' + vm.userinfo.firstname + ', last name: ' + vm.userinfo.lastname + ', email: ' + vm.userinfo.email + ', password: ' + vm.userinfo.password + ', role: ' + vm.userinfo.role + ', location: ' + vm.userinfo.location);
        
        vm.doRegister();
      }
    };

    //register the user
    vm.doRegister = function() {
      //call the register method of the authentication service,
      //pass it the credentials
      //vm.formError = "";
      authentication
      .register(vm.userinfo)
      .error(function(err) {
          //display errors on the form
          //vm.formError = err; 
          console.log('error');
        }).then(function(){
          //if registration was successful clear the query string
          //and redirect the user
          console.log('registration successful');
          $location.search('page', null); 
          console.log('return page: ' + vm.returnPage);
          $location.path(vm.returnPage);
        });
    };

  }

})();

//this file is included in the appClientFiles array in app.js (root)