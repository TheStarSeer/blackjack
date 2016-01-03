var app = angular.module('BlackJackModule');

app.controller('ReportController', ['$scope', 'ReportService', function($scope, ReportService) {
  ReportService.getHandData()
    .then(function(response) {
      $scope.arrHandData = response.data;
    });
}])
