var app = angular.module('BlackJackModule');

app.service('ReportService', ['$http', function($http) {
  var baseUrl = "http://dev.sandbox.com:5000/api";

  this.getHandData = function() {
    return $http.get(baseUrl + '/hand')
      .then(function(response) {
        return response;
      });
  };
}]);
