const ACCELERATION_REPORT_MIN = 12;
const SHAKES_TO_WIN = 1000;
const maracas = new Audio('../../Maracas2.mp3');

app.controller('PhoneController', function($scope, $location, $rootScope) {
  if(!maracas) { const maracas = new Audio('../../Maracas2.mp3'); }
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
  };

  maracas.play();


  $scope.resetShakes = function () {
    $scope.shakes = 0;
  };
  
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

      maracas.play();

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
    const bugle = new Audio('http://static1.grsites.com/archive/sounds/recreation/recreation002.mp3');
    bugle.play();
    $scope.socket.on('moveracer', $scope.racerMover);
    $scope.socket.emit('reset', {});
  };
  
  $scope.deactivateSocket = function() {
    $scope.socket.emit('reset', {});
    $scope.socket.removeAllListeners('moveracer');
  };
  $scope.associateImageWithUniqueId = function(uniqueId) {
    const images = ['/images/pony1.png',
                  '/images/pony2.png',
                  '/images/pony3.png'];

    if (!$scope.imgCache) { $scope.imgCache = {}; }
    if (!$scope.imgCache[uniqueId]) {$scope.imgCache[uniqueId] = images[Math.floor(Math.random() * (images.length - 1) + 0)]; }
    
    console.log("associate image function hit");
  };

  $scope.racerMover = function(data) {
    if (!$scope.players[data.userId] || !$scope.players[data.userId].image) {
      $scope.associateImageWithUniqueId(data.userId);
    }
    $scope.players[data.userId] = {
      name: data.name,
      score: data.shakes,
      image: $scope.imgCache[data.userId]
    };


    $scope.$apply();

    if ($scope.players[data.userId].score > 100 ) { // 100 is for 100% width on the DOM
      $scope.winner = $scope.players[data.userId].name;
      $scope.deactivateSocket();
      $scope.$apply();
      $scope.socket.emit('reset');
    }
  };
});
