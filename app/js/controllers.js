const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  $scope.viewDashboard = false;
  $scope.showDash = function() {
    $scope.viewDashboard = (!$scope.viewDashboard ) ? true : false;
  }

  $scope.validatePassword = function() {
    if ($scope.password !== '********') {
      return $location.url('/')
    } else {
      return $location.url('/playgrid')
    }
  }

  $scope.maracas = new Audio('../../Maracas2.mp3');
  $scope.maracas.play();


  $scope.resetShakes = function () {
    $scope.shakes = 0;
  }
  
  $scope.addName = function() {

    if ($scope.name.toLowerCase().split(' ').join('').indexOf('dickbutt') >= 0) {
      $rootScope.personName = 'Fruit Cake';
      $location.url('/race')
    } else if ($scope.name.toLowerCase().split(' ').join('').indexOf('cena') >= 0 || $scope.name == '') {
      $rootScope.personName = 'Posh Spice';
      $location.url('/race')
    } else {
      $rootScope.personName = $scope.name;
      $location.url('/race')
    }
    $rootScope.personName = $scope.name;

    $location.url('/race')

  }

  $scope.emitShake = function(data) {
    return $scope.socket.emit('shake', data);
  };


  $scope.handleDeviceAccelChange = function(event) {
    event.preventDefault();

    $scope.totalAcceleration = event.acceleration.x +
      event.acceleration.y +
      event.acceleration.z;

   if($scope.totalAcceleration > 20) {
      $scope.shakes++;

      $scope.maracas.play();

      $scope.emitShake({
        name: $rootScope.personName,
        shakes: $scope.shakes
      }); 
      $scope.newsFromSocket = $scope.totalAcceleration;
    }

    $scope.$apply(); 
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

}).controller('PlayGridController', function($scope, $rootScope) {
  $scope.socket = io();
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  // $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
  
  $scope.socket.on('reset', function (data) {
    $scope.resetShakes();
  });
  
}).controller('PlayGridController', function($scope) {

  $scope.title = 'SHAKE RACE!!!';
  $scope.socket = io();

  if (!$scope.players) { $scope.players = {}; }
  $scope.activateSocket = function () {
    $scope.socket.on('moveracer', $scope.racerMover);
    $scope.socket.emit('reset', {});
  }
  $scope.deactivateSocket = function () {
    $scope.socket.emit('reset', {});
    $scope.socket.removeAllListeners('moveracer');
  }
  $scope.racerMover = function (data) {
    $scope.images = ["/images/pony1.png",
                  "/images/pony2.png",
                  "/images/pony3.png"]
    $scope.randomNum = Math.floor(Math.random() * (images.length - 1) + 0)
    $scope.image = images[randomNum];

    $scope.players[data.userId] =  {name: data.name, score: data.shakes};

    $scope.$apply();

    if($scope.players[data.userId].score > 1000) {
      $scope.winner = $scope.players[data.userId].name;
      $scope.deactivateSocket();
      $scope.$apply();
      $scope.socket.broadcast.emit('reset');
    }
  };
});
