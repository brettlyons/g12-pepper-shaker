var app = angular.module('shakeRaceApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'PhoneController'
    })
    .when('/playgrid', {
      templateUrl: '/partials/playGrid.html',
      controller: 'PlayGridController'
    })
    .when('')
  $locationProvider.html5Mode(true);
});
