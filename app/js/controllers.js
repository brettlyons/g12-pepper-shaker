app.controller('PhoneController', function($scope) {
  $scope.greeting = "Hello World!";
  $scope.shakeCount;

  // window.alert("Testing for DeviceMotion");
  // if (window.DeviceMotionEvent) {
  //   window.alert("DeviceMotionEvent supported");
  // }
  var tested = false;
  
  function handleDeviceAccelChange(event) {
    $scope.accelEventData = event;

    if (!tested) {
      window.alert("handleDeviceAccelChange called");
      tested = true;
    }

    // we use to determine accel: event.acceleration;
    var xAccel = event.acceleration.x;
    var yAccel = event.acceleration.y;
    var zAccel = event.acceleration.z;

    // Accels are all in is in m/s^2
    $scope.xAcceleration = xAccel;
    $scope.yAcceleration = yAccel;
    $scope.zAcceleration = zAccel;
  }
  
  window.addEventListener('devicemotion', handleDeviceAccelChange, false);
});
