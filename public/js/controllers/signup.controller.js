var app = angular.module('BlackJackModule');

app.controller("SignupController", ["$scope", "$http", "$location", "UserService", function($scope, $http, $location, UserService) {
  $scope.passwordMessage = "";

  $scope.signup = function(user) {
    if ($scope.user.password !== $scope.passwordRepeat) {
      $scope.passwordMessage = "Passwords do not match.";
    } else {
      UserService.signup(user).then(function(response) {
        $location.path("/login");
      }, function(response) {
        toastr.error("There was a problem: " + response.data)
      });
    }
  }
}]);
