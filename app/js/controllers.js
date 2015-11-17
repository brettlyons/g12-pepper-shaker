app.controller('PhoneController', function($scope) {
$scope.title = 'hello'
})


app.controller('PlayGridController', function($scope) {
  $scope.title = "SHAKE RACE!!!";
  $scope.players = [{name: 'Bob', score: 5}, {name: 'Fred', score: 7}, {name: 'Jenny', score: 4}]
});
