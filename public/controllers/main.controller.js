(function() {
'use strict';
    var app = angular.module('myApp',[]);
    app.controller('MyAppController', MyAppController);

    MyAppController.$inject = ['$http'];
    function MyAppController($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            
        }
    }


})();