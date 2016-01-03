var app = angular.module('BlackJackModule', ['ngRoute', 'BlackJackModule.Auth']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/play', {
      templateUrl: 'views/play.html',
      controller: 'PlayController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/signup', {
        templateUrl: 'views/sign-up.html',
        controller: 'SignupController'
    })
    .when('/report', {
      templateUrl: 'views/report.html',
      controller: 'ReportController'
    })
    .when("/logout", {
        template: "",
        controller: "LogoutController"
    });
});
