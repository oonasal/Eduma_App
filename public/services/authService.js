﻿
(function () {
    angular.module('myApp').factory('authService', ['$q', '$injector', 'localStorageService', 'ngAuthSettings', function ($q, $injector, localStorageService, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var $http;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: false
        };

        var _saveRegistration = function (registration, type) {

            var deferred = $q.defer();
            _logOut();

            $http = $http || $injector.get('$http');
            $http.post(serviceBase + '/api/users/register/' + type , registration)
                .success(function (response) {

                    if(response.message){
                        deferred.reject({ error : response.message});
                    }   else {
                        deferred.resolve(response);
                    }

                })
                .error( function(err,status){
                    deferred.reject(err);
                })
            ;
            // localhost:3000/api/users/register/teachers/
            return deferred.promise;
        };

        var _login = function (loginData, type) {        
            var deferred = $q.defer();

            $http = $http || $injector.get('$http');
            $http.post(serviceBase + '/api/users/login/' + type, loginData, { headers: { 'Content-Type': 'application/json;charset=utf-8' } }).success(function (response) {

                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', { token: response.token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                }
                else {
                    localStorageService.set('authorizationData', { token: response.token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }

        };

        var _refreshToken = function ()
        {
            var deferred = $q.defer();
        
            var authData = localStorageService.get('authorizationData');

            if (authData && authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http = $http || $injector.get('$http');
                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        // authServiceFactory.refreshToken = _refreshToken;

        return authServiceFactory;
    }]);
})();
