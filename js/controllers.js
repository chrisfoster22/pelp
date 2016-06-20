
var seedControllers = angular.module('seedControllers', []);


seedControllers.controller('HomeController', function($scope, $timeout, $http, Markers, MapData) {

      $scope.$watch(function() {
        $scope.message = "Hello";
    });

});

seedControllers.controller('MapController', function($scope, $state, $http, Markers, NgMap, MapData) {

    NgMap.getMap().then(function(map) {
      map.center = [37.553, -77.462];
  });

  $scope.showInfo = function(event, pin) {
    MapData.listing = pin;
    $state.go("listing", {listingId: pin.id});
  };

  $scope.mapData = MapData;

  $scope.$watch('mapData', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.filteredMarkers = filterType($scope.mapData.selectedType);
    }

    Markers.get().then(function (response) {
      $scope.markers = response.data.markers;
      $scope.filteredMarkers = filterType($scope.mapData.selectedType);
            console.log($scope.filteredMarkers);
    });


}, true);

  var filterType = function(type) {
    var markers = [];
    if (type === "All") {
      return $scope.markers;
    }
    angular.forEach($scope.markers, function(marker) {
    if (marker.type === type) {
      markers.push(marker);
    }

  });
    return markers;
};

});

seedControllers.controller('ListingController', function($scope, $http, $stateParams, Markers, MapData) {

  Markers.get().then(function (response) {
    console.log(response);
    angular.forEach(response.data.markers, function(marker) {
      if (parseInt(marker.id) === parseInt($stateParams.listingId)) {
        $scope.listing = marker;
      }
    });
  }, function(error) {
    console.log(error);
  });

  });

  seedControllers.controller('NavController', function($scope, $http, Markers, MapData) {

    $scope.selectedType = "All";

    $scope.changeType = function(type) {
      MapData.selectedType = type;
    };

});
