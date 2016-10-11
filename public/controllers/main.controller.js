(function () {
    var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

    app.controller('HelloController', ['$scope', '$http', 'authService', '$window', function ($scope, $http, authService, $window) {
        console.log('Hello world controller');

        var vm = $scope;

        vm.logOut = logOut;
        vm.isAuth = authService.authentication.isAuth;
        vm.username = authService.authentication.userName;
        vm.isTeacher = authService.authentication.isTeacher;
        vm.redirectToTeachers = redirectToTeachers;
        vm.redirectToStudents = redirectToStudents;

        if (vm.isAuth) {
            // if vm.isTeacher || vm.isStudent
            console.log(vm.isTeacher);
            if(vm.isTeacher) vm.redirectToStudents(); // vm.redirectToTeacherInfoPage
            else vm.redirectToTeachers();
        }

        function logOut() {
            // console.log('logging Out');
            authService.logOut();
            // console.log('loggedOut!');
            $window.location.href = "#/login/";
        }

        function redirectToStudents() {
            console.log('what to do ?');
            $window.location.href = '#/students/??';
        }

        function redirectToTeachers() {
            $window.location.href = '#/teachers/1';
        }
    }]);

    // TODO : SPlit to different page 
    app.controller('LoginController', ['$scope', '$http', 'authService', '$window', function ($scope, $http, authService, $window) {
        var vm = $scope;

        vm.doSubmit = doSubmit;
        vm.isAuth = authService.authentication.isAuth;
        vm.isTeacher = authService.authentication.isTeacher;
        vm.redirectToTeachers = redirectToTeachers;
        vm.redirectToStudents = redirectToStudents;

        if (vm.isAuth) {
            vm.redirectToTeachers();
        }

        function doSubmit() {

            console.log('loggin in ');
            var username = vm.username;
            var password = vm.password;
            var type = vm.type;

            if(!type){
                alert('Please select a type');
                return;
            }

            authService.login({ username: username, password: password }, type).then(function (response) {
                console.log('success with response', response);
                if(!authService.authentication.isTeacher) vm.redirectToTeachers();
                else vm.redirectToStudents();
            });
        }

        function redirectToTeachers() {
            $window.location.href = '#/teachers/1';
        }

        function redirectToStudents() {
            console.log('what to do ?');
            $window.location.href = '#/students/';
        }
    }]);


    // app.controller('TeachersController', ['$http', 'authService', '$route']);

    app.controller('TeacherController', ['$scope', '$http', 'authService', '$route', '$routeParams','$window', function ($scope, $http, authService, $route, $routeParams,$window) {
        // console.log($routeParams);
        var vm = $scope;

        vm.goodTeacher = goodTeacher;
        vm.badTeacher = badTeacher;
        vm.getTeacher = getTeacher;
        vm.goToNextTeacher = goToNextTeacher;

        getTeacher();
        // console.log('calledd');
        function getTeacher() {
            if ($routeParams.teacherId) {
                // $http.get('api/users/teachers/' + $routeParams.teacherId).then( function(response){
                //     $scope.currentTeacher = response.data;
                // });
                $http.get('api/users/teachers').then(function (response) {
                    // console.log('fake dataa')
                    let responseData = response.data;

                    // console.log(responseData);

                    $http.get('api/users/teachers/' + $routeParams.teacherId).then(function (response) {
                        $scope.currentTeacher.info = response.data['teacher'];
                        $scope.currentTeacher.nextTeacherId = response.data['nextTeacherId'];
                    });                    

                    $scope.currentTeacher = {};
                });
            } else {
                // You seems to be lost , let's redirect you to somewhere lol
                console.error("Lost");
            }
        }


        // TODO: POST GOOD BAD ?

        // TODO : tEACHER FEEDBACK ?
        function goodTeacher(teacherId) {
            console.log(teacherId); 
            goToNextTeacher($scope.currentTeacher.nextTeacherId);
        }

        function badTeacher(teacherId) {
            console.log(teacherId);
            goToNextTeacher($scope.currentTeacher.nextTeacherId);
        }

        function goToNextTeacher(teacherId){
            $window.location.href = '#/teachers/' + teacherId;
        }

    }]);

    app.controller('CoursesController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;
    }]);

    app.controller('CourseController', ['$scope', '$http', 'authService', '$route', '$routeParams', function ($scope, $http, authService, $route, $routeParams) {
        console.log($routeParams);
        var vm = $scope;

        function enroll(courseId) {

        }

        function bookmark(courseId) {

        }
    }]);

    app.controller('RegisterController', ['$scope', '$http', 'authService', '$route', '$routeParams','$window', function ($scope, $http, authService, $route, $routeParams,$window) {
        var vm = $scope;

        vm.register = register;

        function register(model) {
            console.log('registering as ', $scope.type);

            authService.saveRegistration(model, $scope.type).then(function (response) {
                if (response.error) {
                    console.error(response.error);
                }   else {
                    $window.location.href = '#/login';
                }
            });
        }
    }]);



    // TODO : Route interceptor
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                // templateUrl : 'views/app.html',
                controller: 'HelloController'
            })
            .when('/login', {
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
            .when('/register/', {
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

