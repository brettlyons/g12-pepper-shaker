app.controller('PhoneController', function($scope) {
  $scope.greeting = "Hello World!";
  $scope.shakeCount;

  // window.alert("Testing for DeviceMotion");
  // if (window.DeviceMotionEvent) {
  //   window.alert("DeviceMotionEvent supported");
  // }
  var tested = false;
  function handleDeviceAccelChange(event) {
    $scope.accelEventData = event.acceleration;
    // window.alert(event.acceleration.x);
    // we use to determine accel: event.acceleration;
    if(!tested) {
      window.alert("eventData:", event);
      tested = true;
    }
    // Accels are all in is in m/s^2
    $scope.xAcceleration = event.acceleration.x;
    $scope.yAcceleration = event.acceleration.y;
    $scope.zAcceleration = event.acceleration.z;
  }

  window.addEventListener('devicemotion', handleDeviceAccelChange, false);
});
