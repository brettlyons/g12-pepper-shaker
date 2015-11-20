const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  const maracas = new Audio('../../Maracas2.mp3');
  maracas.play();

  $scope.addName = function() {
    $rootScope.personName = $scope.name;
    console.log($rootScope.name);
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

}).controller('PlayGridController', function($scope) {
  $scope.socket = io();
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  // $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
  $scope.players ={}
  $scope.players['123'] = { name: 'Bob', score: 7};
  $scope.players['gerbils'] = { name: 'Fred', score: 2 };
  $scope.title = "SHAKE RACE!!!";
  $scope.socket = io();
  $scope.socket.on('moveracer', function (data) {
    console.log("MOVERACER RECEIVED IN GRID CONTROLLER.  LOG DATA: ", data);
    
    $scope.apply();
  });


});
