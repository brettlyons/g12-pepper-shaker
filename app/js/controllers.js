app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Hello World!';
  $scope.shakeCount;
  $scope.quant = 0;

  // window.alert("Testing for DeviceMotion");
  // if (window.DeviceMotionEvent) {
  //   window.alert("DeviceMotionEvent supported");
  // }
  $scope.handleDeviceAccelChange = function(event) {
    event.preventDefault();
    // window.alert(event.acceleration.x);
    // we use to determine accel: event.acceleration;

    // Accels are all in is in m/s^2
    // debugger;
    $scope.greeting = 'PING PONG';
    // $scope.quant++;
    // for(var i = 0; i < 1000; i++){
    //   $scope.xAcceleration = i;
    // }
    if (event.acceleration.x > 10) {
      $scope.xAcceleration = event.acceleration.x;
    }
    if (event.acceleration.y > 10) {
      $scope.yAcceleration = event.acceleration.y;
    }
    if (event.acceleration.z > 10) {
      $scope.zAcceleration = event.acceleration.z;
    }
    // $scope.accelEventData = event.acceleration;
    $scope.$apply();
  };
  // $on('devicemotion', $scope.handleDeviceAccelChange);
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

});

