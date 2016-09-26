(function(){
    var app = angular.module('myApp');
    app.service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        this.login = login;
        
        console.log('Userservice init');
        ////////////////

        function testFunc() { 
            console.log('callfunc');
        }

        function login( email , password ) {
            console.info('login with email',email,'and password ',password);
            // TODO : A promise ? something ? please ? 
        }
    }
})();
