const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope) {
  $scope.greeting = 'Dashboard';
  const socket = io();


  $scope.testxShakes = 0;
  $scope.testyShakes = 0;
  $scope.testzShakes = 0;
  $scope.testEachShakeAmount = 0;
  $scope.testTotalShakes = 0;
  $scope.testSendData = function() {
    var randX = Math.floor(Math.random() * (3-1+1)) + 1;
    var randY = Math.floor(Math.random() * (3-1+1)) + 1;
    var randZ = Math.floor(Math.random() * (3-1+1)) + 1;
    var randShake = Math.floor(Math.random() * (20-1+1)) + 1;

    $scope.testxShakes = randX;
    $scope.testyShakes = randY;
    $scope.testzShakes = randZ;
    $scope.testEachShakeAmount = randShake;

    $scope.testTotalShakes += randShake; 

  };

  socket.on('news', function (data) {
    console.log(data);
    $scope.newsFromSocket = data;
    socket.emit('my other event', { my: 'data' });
    $scope.$apply();
  });
  
  $scope.xShakes = 0; // used to "count shakes" in game logic later
  $scope.yShakes = 0;
  $scope.zShakes = 0;
  $scope.emitShake = function(data) {
    return socket.emit('my other event', data);
  };

  $scope.handleDeviceAccelChange = function(event) {
    event.preventDefault();
    if (event.acceleration.x > ACCELERATION_REPORT_MIN) {
      $scope.xAcceleration = event.acceleration.x;
      $scope.xShakes++;
      $scope.emitShake({
        xShakes: $scope.xShakes,
        yShakes: $scope.yShakes,
        zShakes: $scope.zShakes
      });
    }
    if (event.acceleration.y > ACCELERATION_REPORT_MIN) {
      $scope.yAcceleration = event.acceleration.y;
      $scope.yShakes++;
      $scope.emitShake({
        xShakes: $scope.xShakes,
        yShakes: $scope.yShakes,
        zShakes: $scope.zShakes
      });
    }
    if (event.acceleration.z > ACCELERATION_REPORT_MIN) {
      $scope.zAcceleration = event.acceleration.z;
      $scope.zShakes++;
      $scope.emitShake({
        xShakes: $scope.xShakes,
        yShakes: $scope.yShakes,
        zShakes: $scope.zShakes
      });
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

