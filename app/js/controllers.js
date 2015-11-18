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

  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);
}).controller('PlayGridController', function($scope) {
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  $scope.title = "SHAKE RACE!!!";
  $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
});

