const ACCELERATION_REPORT_MAX = 12;

app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Hello World Of Physics!';
  $scope.shakeCount; // used to "count shakes" in game logic later
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
    // $scope.greeting = 'PING PONG';
    // $scope.quant++;
    // for(var i = 0; i < 1000; i++){
    //   $scope.xAcceleration = i;
    // }
    // 10 is an arbitrary acceleration range.
    // later we may need to redefine it, and it should
    if (event.acceleration.x > ACCELERATION_REPORT_MAX) {
      $scope.xAcceleration = event.acceleration.x;
    }
    if (event.acceleration.y > ACCELERATION_REPORT_MAX) {
      $scope.yAcceleration = event.acceleration.y;
    }
    if (event.acceleration.z > ACCELERATION_REPORT_MAX) {
      $scope.zAcceleration = event.acceleration.z;
    }
    // $scope.accelEventData = event.acceleration;
    $scope.$apply();
  };
  // $on('devicemotion', $scope.handleDeviceAccelChange);
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);
}).controller('PlayGridController', function($scope) {
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  $scope.title = "SHAKE RACE!!!";
  $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
});

