app.controller('PhoneController', function($scope) {
  $scope.greeting = "Hello World!";
  $scope.shakeCount;

  if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent supported");
  } 
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
