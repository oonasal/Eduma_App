(function() {

  angular
    .module('edumaApp')
    .service('edumaData', edumaData);

  edumaData.$inject = ['$http', 'authentication'];
  

  function edumaData ($http, authentication) {

    /*var teachers = function() {
      return $http.get('/api/users/teachers');
    };*/
  
    /*var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };

    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    //passes an HTTP header containing a JWT.
    //the API endpoint will be able to validate the user
    //(this is for functionalities that require the user
    //to be logged in)
    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById
    };*/
  }

})();