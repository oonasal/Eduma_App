(function () {
    var app = angular.module('myApp', ['ngRoute','LocalStorageModule']);

    // TODO : SPlit to different page 
    app.controller('LoginController', ['$scope', '$http', 'authService', '$window', function ($scope, $http, authService, $window) {
        var vm = $scope;

        vm.doSubmit = doSubmit;
        vm.isAuth = authService.authentication.isAuth;
        vm.redirectToTeachers = redirectToTeachers;

        if( vm.isAuth) {
            vm.redirectToTeachers();
        }

        function doSubmit() {
            var username = vm.username;
            var password = vm.password;
            var type = vm.type;

            authService.login({ username : username,password: password},type).then(function(response){
                console.log('success with response',response);
                vm.redirectToTeachers();
            });
        }

        function redirectToTeachers() {
            $window.location.href = '#/teachers/1';
        }
    }]);


    app.controller('TeachersController',['$http','authService','$route'])
    app.controller('TeacherController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        // console.log($routeParams);
        var vm = $scope;
        
        vm.goodTeacher = goodTeacher;
        vm.badTeacher = badTeacher;
        vm.getTeacher = getTeacher;
        
        getTeacher();
        // console.log('calledd');
        function getTeacher() {
            if( $routeParams.teacherId ) {
                // $http.get('api/users/teachers/' + $routeParams.teacherId).then( function(response){
                //     $scope.currentTeacher = response.data;
                // });
                $http.get('fakedatas/oneTeacherPage.json').then( function(response){
                    // console.log('fake dataa')
                    $scope.currentTeacher = response.data;
                });
            }   else {
                // You seems to be lost , let's redirect you to somewhere lol
                console.error("Lost");
            }
        }


        // TODO : tEACHER FEEDBACK ?
        function goodTeacher( teacherId ) {
            console.log(teacherId);
        }

        function badTeacher( teacherId ) {
            console.log(teacherId);
        }

    }]);

    app.controller('CoursesController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('CourseController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;

        function enroll ( courseId ) {

        }

        function bookmark ( courseId ) {

        }
    }]);

    app.controller('RegisterController',['$scope', '$http', 'authService', '$route', '$routeParams',function($scope, $http, authService, $route, $routeParams){
        var vm = $scope;

        vm.register = register;

        function register( model ) {
            console.log('registering as ',$scope.type);
            
            authService.saveRegistration(model,$scope.type).then(function(response){
                if(response.error){
                    console.error(response.error);
                }
            });
        }
    }]);



    // TODO : Route interceptor
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/teachers/', {
                templateUrl: 'views/teachers.html',
                controller: 'TeachersController'
            })
            .when('/teachers/:teacherId', {
                templateUrl: 'views/teacher.html',
                controller: 'TeacherController'
            })
            // .when('/courses/', {
            //     templateUrl: 'views/courses.html',
            //     controller: 'CoursesController'
            // })
            .when('/courses/:id', {
                templateUrl: '/views/course.html',
                controller: 'CourseController'
            })
            .when('/register/',{
                templateUrl: '/views/register.html',
                controller: 'RegisterController'
            });
    });

    app.constant('ngAuthSettings', {
        apiServiceBaseUri: '', // TODO : Something else ? or just nothing , we don't need this lol
        clientId: 'ngAuthApp'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);


})();

