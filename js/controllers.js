
var seedControllers = angular.module('seedControllers', []);


seedControllers.controller('HomeController', function($scope, $timeout, $http, Markers, MapData) {

      console.log(MapData.message);
      $scope.$watch(function() {
        $scope.message = MapData.listing.name;
    });





});

seedControllers.controller('MapController', function($scope, $state, $http, Markers, NgMap, MapData) {

    NgMap.getMap().then(function(map) {
      map.center = [37.553, -77.462];
  });

  Markers.get().then(function (data) {
    $scope.markers = data.data.markers;
  });

  $scope.showInfo = function(event, pin) {
    MapData.listing = pin;
    $state.go("listing", {listingId: pin.id});
  };

  $scope.mapData = MapData;

  $scope.$watch('mapData', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      console.log("same");
      $scope.filteredMarkers = filterType($scope.mapData.selectedType);
    }

    Markers.get().then(function (data) {
      $scope.markers = data.data.markers;
      $scope.filteredMarkers = filterType($scope.mapData.selectedType);
    });


}, true);

  var filterType = function(type) {
    var markers = [];
    console.log(type);
    if (type === "All") {
      return $scope.markers;
    }
    angular.forEach($scope.markers, function(marker) {
    if (marker.type === type) {
      console.log(marker.type);
      markers.push(marker);
    }

  });
    return markers;
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

  seedControllers.controller('NavController', function($scope, $http, Markers, MapData) {

    $scope.selectedType = "All";

    $scope.changeType = function(type) {
      MapData.selectedType = type;
    };

});
