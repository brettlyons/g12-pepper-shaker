app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Hello World!';
  $scope.shakeCount;
  $scope.quant = 0;

  // window.alert("Testing for DeviceMotion");
  // if (window.DeviceMotionEvent) {
  //   window.alert("DeviceMotionEvent supported");
  // }
  $scope.handleDeviceAccelChange = function(event) {
    // window.alert(event.acceleration.x);
    // we use to determine accel: event.acceleration;

    // Accels are all in is in m/s^2
    // debugger;
    $scope.greeting = 'the handleDeviceAccelChange function happening';
    $scope.quant++;
    $scope.xAcceleration = event.acceleration.x;
    $scope.yAcceleration = event.acceleration.y;
    $scope.zAcceleration = event.acceleration.z;
    $scope.accelEventData = event.acceleration;
  };

  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, false);
  //window.doStuff = handleDeviceAccelChange;
});

