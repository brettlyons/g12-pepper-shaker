const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  const maracas = new Audio('../../Maracas2.mp3');
  maracas.play();

  $scope.addName = function() {
    $rootScope.personName = $scope.name;
    console.log($scope.personName)
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
      $scope.emitShake({
        name: $rootScope.personName,
        shakes: $scope.shakes
      }); 
      $scope.newsFromSocket = $scope.totalAcceleration;
    }

    $scope.$apply(); 
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);


}).controller('PlayGridController', function($scope, $rootScope) {
  $scope.socket = io();
if (!$scope.players) { $scope.players = {} }
  $scope.socket.on('moveracer', function(data) {
      var images = ["/images/pony1.png",
                  "/images/pony2.png",
                  "/images/pony3.png"]
     var randomNum = Math.floor(Math.random() * (images.length - 1) + 0)
     $scope.image = images[randomNum];
    // console.log("SOCKET DATA ON RACE GRID", data)
    $scope.players[data.userId] =  {name: data.name, score: data.shakes, image: $scope.image};
    $scope.$apply();
  });


  });
