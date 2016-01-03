app.controller("LogoutController", ["$location", "UserService", function ($location, UserService) {
    UserService.logout();
}]);
