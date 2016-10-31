
//angular routing

(function () {

  angular.module('edumaApp', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/login'
      })
      .when('/home', {
        templateUrl: '/views/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
        //template : "<h1>Main</h1><p>Click on the links to change this content</p>"
      })

      /*.when('/teachers/:teacherid', {
        templateUrl: '/views/home.view.html',
        controller: 'teacherCtrl',
        controllerAs: 'vm'
        //template : "<h1>Main</h1><p>Click on the links to change this content</p>"
      })*/
      /*.when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })*/
      /*.when('/location/:locationid', {
        templateUrl: '/locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
      })*/

      //route for the angular registration page
      .when('/register', {
        templateUrl: '/views/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })

      //route for the angular login page
      .when('/login', {
        templateUrl: '/views/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

      // use the HTML5 History API
      $locationProvider.html5Mode(true);

  }

  angular
    .module('edumaApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();