(function(){
    var app = angular.module('myApp',[]);

    
    app.controller('MyAppController',['$scope','$http','AuthService',function ($scope,$http,authService) {
        var vm = $scope;

        vm.doSubmit = doSubmit;

        function doSubmit() {
            var email = vm.email;
            var password = vm.password;

            authService.login(email,password)  // promise me you will love me lololol - I mean use promise here
            // console.log(email,password);
        }        
    }]);


    app.controller('LoginController',['$scope','$http','AuthService',function($scope,$http,authService) {
        var vm = this;
        console.log($http);
        // AuthService.callFunc();
    }]);

})()

