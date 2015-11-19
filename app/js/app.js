var app = angular.module('shakeRaceApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'PhoneController'
    })
<<<<<<< HEAD
    .when('/playgrid', {
      templateUrl: '/partials/playGrid.html',
=======
    .when('playgrid', {
      templateUrl: 'partials/playGrid.html',
>>>>>>> 6365fa90afd782eaa408e8a30ab182bd330b22b1
      controller: 'PlayGridController'
    });
  $locationProvider.html5Mode(true);
});
