(function(){
    var app = angular.module('myApp');
    app.service('CourseService', CourseService);

    CourseService.$inject = ['$http'];
    function CourseService($http) {
        this.login = login;
        
        console.log('Courseservice init');
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
