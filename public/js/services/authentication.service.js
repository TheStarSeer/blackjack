var app = angular.module("BlackJackModule.Auth", []);

app.service("TokenService", [function() {
  var userToken = "token";

  this.setToken = function(token) {
    localStorage[userToken] = token;
  }

  this.getToken = function() {
    return localStorage[userToken];
  }

  this.removeToken = function() {
    localStorage.removeItem(userToken);
  }
}]);

app.service("UserService", ["$http", "$q", "$location", "TokenService", function($http, $q, $location, TokenService) {
  var baseUrl = "http://dev.sandbox.com:5000/auth";

  this.signup = function(user) {
    return $http.post(baseUrl + "/signup", user);
  }

  this.login = function(user) {
    return $http.post(baseUrl + "/login", user)
      .then(function(response) {
        TokenService.setToken(response.data.token);
        return response;
      });
  }

  this.logout = function() {
    TokenService.removeToken();
    $location.path('/login');
  }

  this.isAuthenticated = function() {
    return !!TokenService.getToken();
  }
}]);


// HttpInterceptor
// In charge of adding the token to the $http request and handling errors related to $http

app.factory("AuthInterceptor", ["$q", "$location", "TokenService", function($q, $location, TokenService) {
  return {
    request: function(config) {
      var token = TokenService.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer " + token
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401) {
        TokenService.removeToken();
        $location.path("/login");
      }
      return $q.reject(response);
    }
  }
}]);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
