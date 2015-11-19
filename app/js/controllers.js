const ACCELERATION_REPORT_MIN = 12;

app.controller('PhoneController', function($scope) {
  $scope.socket = io();
  $scope.greeting = 'Hello World Of Physics!';

  $scope.addName = function() {
    console.log($scope.name);
  }
 

  $scope.emitShake = function(data) {
    return $scope.socket.emit('shake', data);
  };


  $scope.handleDeviceAccelChange = function(event) {
    event.preventDefault();


    // $scope.totalAcceleration = event.acceleration.x +
    //   event.acceleration.y +
    //   event.acceleration.z;

    if($scope.totalAcceleration > 10) {
      $scope.emitShake(); // name passed into Emit Shake here?
      $scope.newsFromSocket = $scope.totalAcceleration;
    }
    // $scope.accelEventData = event.acceleration;
    $scope.$apply(); 
  };
  window.addEventListener('devicemotion', $scope.handleDeviceAccelChange, true);

}).controller('PlayGridController', function($scope) {
  // players are hardcoded for now, eventually this will be aggregated from somewhere else
  // so it's sort of a stub that will be adjusted later
  $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
  $scope.title = "SHAKE RACE!!!";

  $scope.socket.on('moveracer', function (data) {
    console.log("MOVERACER RECEIVED.  LOG DATA: ", data);
    // so $scope.players can be a {} with a property of uniqueIds
    // $scope.players[data.uniqueId].name = data.name; // WHERE IS DATA.NAME!?? 
    $scope.players[data.uniqueId].shakes = data.shakes;
    // change the 1 object in the array that matches (data)

    // $scope.players = [{name: "Tester Testington", score: data.shakes}]; // DEBUG DEBUG DEBUG
    $scope.apply();
  });
  

});