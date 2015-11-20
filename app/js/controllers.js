const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  const maracas = new Audio('../../Maracas2.mp3');
  maracas.play();
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

  $scope.addName = function() {
    if ($scope.name.toLowerCase().split(' ').join('').indexOf('dickbutt') >= 0) {
      $rootScope.personName = 'Fruit Cake';
      $location.url('/race')
    } else if ($scope.name.toLowerCase().split(' ').join('').indexOf('johncena') >= 0) {
      $rootScope.personName = 'Posh Spice';
      $location.url('/race')
    } else {
      $rootScope.personName = $scope.name;
      $location.url('/race')
    }
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
      maracas.play();
      $scope.emitShake({
        name: $rootScope.personName,
        shakes: $scope.shakes
      });
      $scope.newsFromSocket = $scope.totalAcceleration;
    }
    // $scope.accelEventData = event.acceleration;
    $scope.$apply();
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

}).controller('PlayGridController', function($scope, $rootScope) {
  $scope.socket = io();
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  // $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
  $scope.players =[];
  $scope.title = "SHAKE RACE!!!";
  $scope.socket = io();
  $scope.socket.on('moveracer', function (data) {
    if ($scope.players.indexOf(data.userId) == -1) {
      $scope.players.push(data.userId);
      $scope.players.push(data.shakes)
    } else if ($scope.players.indexOf(data.userId) > -1) {
      $scope.players.splice($scope.players.indexOf(data.userId) + 1, 1, data.shakes)
    }
    console.log($scope.players);
  });
  
  $scope.title = 'SHAKE RACE!!!';

  if (!$scope.players) { $scope.players = {} }

  $scope.socket.on('moveracer', function(data) {
    // console.log("SOCKET DATA ON RACE GRID", data)
    $scope.players[data.userId] =  {name: data.name, score: data.shakes};
    $scope.$apply();
  });
});
