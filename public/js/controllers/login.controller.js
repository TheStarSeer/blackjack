var app = angular.module('BlackJackModule');

app.controller("LoginController", ["$scope", "$http", "$location", "UserService", function($scope, $http, $location, UserService) {

  $scope.login = function(user) {
    UserService.login(user).then(function(response) {
      $location.path("/play");
    }, function(response) {
      // Display an error for unauthorized user name or password.
      toastr.error(response.data)

    });
  }
}]);
