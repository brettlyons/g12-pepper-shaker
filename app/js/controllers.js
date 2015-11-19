const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Hello World Of Physics!';
  const socket = io();

  // socket.on('news', function (data) {
  //   console.log(data);
  //   $scope.newsFromSocket = data;
  //   socket.emit('my other event', { my: 'data' });
  //   $scope.$apply();
  // });

  $scope.emitShake = function(data) {
    return socket.emit('shake', data);
  };



  $scope.handleDeviceAccelChange = function(event) {
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
  $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]

  socket.on('moveracer', function (data) {
    // change the 1 object in the array that matches (data)
    $scope.players = [{name: "Tester Testington", score: data.shakes, userId: data.userId }]; // test data
    $scope.apply();
  });
  
  $scope.title = "SHAKE RACE!!!";
});

