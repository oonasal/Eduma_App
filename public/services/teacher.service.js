(function(){
    var app = angular.module('myApp');
    app.service('TeacherService', TeacherService);

    TeacherService.$inject = ['$http'];
    function TeacherService($http) {
        this.login = login;
        
        console.log('Teacherservice init');
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
