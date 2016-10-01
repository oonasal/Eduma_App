(function () {
    var app = angular.module('myApp', ['ngRoute','LocalStorageModule']);


    app.controller('LoginController', ['$scope', '$http', 'authService', function ($scope, $http, authService) {
        var vm = $scope;

        vm.doSubmit = doSubmit;

        function doSubmit() {
            var username = vm.username;
            var password = vm.password;

            authService.login({ username : username,password: password}).then(function(response){
                console.log('success with response',response);
            });
        }
    }]);

    app.controller('TeachersController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('TeacherController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);

        if( $routeParams.teacherId) {
            $http.get('api/users/teachers/' + $routeParams.teacherId).then( function(response){
                
            });
        }

        var vm = $scope;
    }]);

    app.controller('CoursesController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('CourseController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('RegisterController',['$scope', '$http', 'authService', '$route', '$routeParams',function($scope, $http, authService, $route, $routeParams){
        var vm = $scope;

        vm.register = register;
        vm.getModel = getModel;

        function register( model ) {
            console.log('registering as ',$scope.type);
            authService.saveRegistration(model,$scope.type);
        }

        function getModel() {
            return $scope.type == 'teacher' ? $scope.teacherModel : $scope.studentModel;
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
            .when('/courses/', {
                templateUrl: 'views/courses.html',
                controller: 'CoursesController'
            })
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

