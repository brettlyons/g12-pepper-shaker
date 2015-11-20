const ACCELERATION_REPORT_MIN = 12;
const SHAKES_TO_WIN = 500;
app.controller('PhoneController', function($scope, $location, $rootScope) {
  $scope.socket = io();
  $scope.shakes = 0;
  $scope.viewDashboard = false;
  $scope.showDash = function() {
    $scope.viewDashboard = (!$scope.viewDashboard ) ? true : false;
  }

  $scope.validatePassword = function() {
    if ($scope.password !== '********') {
      return $location.url('/')
    } else {
      return $location.url('/playgrid')
    }
  }

  $scope.maracas = new Audio('../../Maracas2.mp3');
  $scope.maracas.play();


  $scope.resetShakes = function () {
    $scope.shakes = 0;
  }
  
  $scope.addName = function() {

    if ($scope.name.toLowerCase().split(' ').join('').indexOf('dickbutt') >= 0) {
      $scope.name = 'Prissy spice';
      $location.url('/race');
    } else if ($scope.name.toLowerCase().split(' ').join('').indexOf('cena') >= 0 || $scope.name == '') {
      $scope.name = 'Posh Spice';
      $location.url('/race');
    }
    
    $rootScope.personName = $scope.name;
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

      $scope.maracas.play();

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
  
}).controller('PlayGridController', function($scope, $rootScope) {
  $scope.title = 'SHAKE RACE!!!';
  $scope.socket = io();

  if (!$scope.players) { $scope.players = {}; }
  $scope.activateSocket = function () {
    $scope.bugle = new Audio('http://static1.grsites.com/archive/sounds/recreation/recreation002.mp3');
    $scope.bugle.play();
    $scope.socket.on('moveracer', $scope.racerMover);
    $scope.socket.emit('reset', {});
  };
  
  $scope.deactivateSocket = function () {
    $scope.socket.emit('reset', {});
    $scope.socket.removeAllListeners('moveracer');
  };
  
  $scope.racerMover = function (data) {
    $scope.images = ["/images/pony1.png",
                    "/images/pony2.png",
                     "/images/pony3.png"];
    $scope.randomNum = Math.floor(Math.random() * ($scope.images.length - 1) + 0);
    $scope.image = $scope.images[$scope.randomNum];

    $scope.players[data.userId] =  {name: data.name, score: data.shakes, image: $scope.image};

    $scope.$apply();

    if($scope.players[data.userId].score > SHAKES_TO_WIN ) {
      $scope.winner = $scope.players[data.userId].name;
      $scope.deactivateSocket();
      $scope.$apply();
      $scope.socket.emit('reset');
    }
  };
});
