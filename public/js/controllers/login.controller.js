var app = angular.module('BlackJackModule');

app.controller("LoginController", ["$scope", "$http", "$location", "UserService", function ($scope, $http, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/play");
        }, function (response) {
            console.log(response.data);
            alert(response.data.message);
        });
    }
}]);
