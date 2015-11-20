const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  $scope.maracas = new Audio('../../Maracas2.mp3');
  //maracas.play();

  $scope.resetShakes = function () {
    $scope.shakes = 0;
  }
  
  $scope.addName = function() {
    $rootScope.personName = $scope.name;
<<<<<<< HEAD
=======
    console.log($scope.personName)
>>>>>>> 16cf55abacd579aa0cc1378521eb8e02b2c8afe6
    $location.url('/race')
  }

  $scope.emitShake = function(data) {
    return $scope.socket.emit('shake', data);
  };


  $scope.handleDeviceAccelChange = function(event) {
    event.preventDefault();

    $scope.totalAcceleration = event.acceleration.x +
      event.acceleration.y +
      event.acceleration.z;

   if($scope.totalAcceleration > 20) {
      $scope.shakes++;
<<<<<<< HEAD
      $scope.maracas.play();
=======
>>>>>>> 16cf55abacd579aa0cc1378521eb8e02b2c8afe6
      $scope.emitShake({
        name: $rootScope.personName,
        shakes: $scope.shakes
      }); 
      $scope.newsFromSocket = $scope.totalAcceleration;
    }

    $scope.$apply(); 
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

  $scope.socket.on('reset', function (data) {
    $scope.resetShakes();
  });
  
}).controller('PlayGridController', function($scope) {
  $scope.title = 'SHAKE RACE!!!';
  $scope.socket = io();

  if (!$scope.players) { $scope.players = {}; }
  $scope.activateSocket = function () {
    $scope.socket.on('moveracer', $scope.racerMover);
    $scope.socket.emit('reset', {});
  }
  $scope.deactivateSocket = function () {
    $scope.socket.emit('reset', {});
    $scope.socket.removeAllListeners('moveracer');
  }
  $scope.racerMover = function (data) {
    $scope.images = ["/images/pony1.png",
                  "/images/pony2.png",
                  "/images/pony3.png"]
    $scope.randomNum = Math.floor(Math.random() * (images.length - 1) + 0)
    $scope.image = images[randomNum];

    $scope.players[data.userId] =  {name: data.name, score: data.shakes};

    $scope.$apply();

    if($scope.players[data.userId].score > 1000) {
      $scope.winner = $scope.players[data.userId].name;
      $scope.deactivateSocket();
      $scope.$apply();
      $scope.socket.broadcast.emit('reset');
    }
  };
});
