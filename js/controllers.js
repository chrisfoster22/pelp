
var seedControllers = angular.module('seedControllers', []);


seedControllers.controller('HomeController', function($scope, $timeout, $http, Data, Markers, MapData) {
  // Data.get().then(function (data) {
  //
  //     });
      console.log(MapData.message);
      $scope.$watch(function() {
        $scope.message = MapData.listing.name;
    });





});

seedControllers.controller('MapController', function($scope, $state, $http, Data, Markers, NgMap, MapData) {

    NgMap.getMap().then(function(map) {
      map.center = [37.553, -77.462];
  });

  $scope.coffee = {
   url: '/img/icons/coffee.svg',
  //  size: [100, 100],
   scaledSize: [70, 70]
 };

  Markers.get().then(function (data) {
    $scope.positions = data.data.markers;
  });

  $scope.showInfo = function(event, pin) {
    MapData.listing = pin;
    $state.go("listing", {listingId: pin.id});
  };

});

seedControllers.controller('ListingController', function($scope, $http, $stateParams, Markers, MapData) {

  Markers.get().then(function (data) {
    angular.forEach(data.data.markers, function(marker) {
      if (parseInt(marker.id) === parseInt($stateParams.listingId)) {
        $scope.listing = marker;
      }
    });
  });




});
