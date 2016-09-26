(function () {
    var app = angular.module('myApp', ['ngRoute']);


    app.controller('LoginController', ['$scope', '$http', 'AuthService', function ($scope, $http, authService) {
        var vm = $scope;

        vm.doSubmit = doSubmit;

        function doSubmit() {
            var email = vm.email;
            var password = vm.password;

            authService.login(email, password)  // promise me you will love me lololol - I mean use promise here
            // console.log(email,password);
        }
    }]);

    app.controller('TeachersController', ['$scope', '$http', 'AuthService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('TeacherController', ['$scope', '$http', 'AuthService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('CoursesController', ['$scope', '$http', 'AuthService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('CourseController', ['$scope', '$http', 'AuthService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
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
            });
    })
})();

