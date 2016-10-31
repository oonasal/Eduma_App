(function () {

  angular
    .module('edumaApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    /*vm.pageHeader = {
      title: 'Sign in to Loc8r'
    };*/

    vm.credentials = {
      email : "",
      password : ""
    };

    //defines where the user will be redirected after login
    vm.returnPage = $location.search().page || '/home';

    //when the user clicks the submit button
    vm.onSubmit = function () {
      //vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        //vm.formError = "All fields required, please try again";
        console.log('all fields required.');
        return false;
      } else {
        vm.doLogin();
      }
    };

    //login -- call the login method of the authentication service
    vm.doLogin = function() {
      console.log('attempting to login');
      //vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          //vm.formError = err;
          console.log('error.');
        })
        .then(function(){
          //if registration was successful clear the query string
          //and redirect the user
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };

  }

})();