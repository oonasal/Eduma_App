(function(){
    var app = angular.module('myApp');
    app.service('AuthService', AuthService);

    AuthService.$inject = ['$http'];
    function AuthService($http) {
        this.login = login;
        
        console.log('authservice init');
        ////////////////

        function testFunc() { 
            console.log('callfunc');
        }

        function login( email , password ) {
            console.info('login with email',email,'and password ',password);
            // TODO : A promise ? something ? please ? 
            $http.get('/register/teachers')
        }

        function register( payload ) {
            $http.post('/register/teachers',)
        }
    }
})();
