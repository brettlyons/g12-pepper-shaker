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

}).controller('PlayGridController', function($scope, $rootScope) {
  $scope.socket = io();
  $scope.title = 'SHAKE RACE!!!';

  if (!$scope.players) { $scope.players = {} }

  $scope.socket.on('moveracer', function(data) {
    $scope.players[data.userId] =  {name: data.name, score: data.shakes};
    $scope.$apply();
  });
});
