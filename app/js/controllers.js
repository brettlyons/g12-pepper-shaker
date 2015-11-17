app.controller('PhoneController', function($scope) {
  $scope.greeting = "Hello World!";
  $scope.shakeCount;
  $scope.xAcceleration = 0;
  $scope.yAcceleration = 0
  $scope.zAcceleration = 0;

  window.addEventListener('devicemotion', handleDeviceAccelChange, true);
  
  function handleDeviceAccelChange(event) {
    $scope.accelEventData = event;

    // we use to determine accel: event.acceleration;
    var xAccel = event.acceleration.x;
    var yAccel = event.acceleration.y;
    var zAccel = event.acceleration.z;

    // Accels are all in is in m/s^2
    $scope.xAcceleration = xAccel;
    $scope.yAcceleration = yAccel;
    $scope.zAcceleration = zAccel;
  }
});
