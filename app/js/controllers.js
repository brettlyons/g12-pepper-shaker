const ACCELERATION_REPORT_MIN = 12;
$scope.socket = io();
app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Hello World Of Physics!';
 

  $scope.emitShake = function(data) {
    return socket.emit('shake', data);
  };

  $scope.handleDeviceAccelChange = function(e) {
    event.preventDefault();


    $scope.totalAcceleration = event.acceleration.x +
      event.acceleration.y +
      event.acceleration.z;
    
    if($scope.totalAcceleration > 50) {
      $scope.emitShake({shakeIncrement: 1});
    }
    // $scope.accelEventData = event.acceleration;
    $scope.$apply(); 
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

}).controller('PlayGridController', function($scope) {
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  // $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]

  $scope.socket.on('moveracer', function (data) {
    // change the 1 object in the array that matches (data)
    $scope.players = [{name: "Tester Testington", score: data.shakes, userId: data.userId }]; // test data
    $scope.apply();
  });
  
  $scope.title = "SHAKE RACE!!!";
});
