var app = angular.module('BlackJackModule');

app.directive('navbar', ['UserService', function(UserService) {
  return {
    templateUrl: 'js/directives/navbar.html',
    link: function (scope) {
      scope.$watch(function() {
        return UserService.isAuthenticated();
      }, function() {
        scope.isAuthenticated = UserService.isAuthenticated();
      });
    }
  }
}]);
