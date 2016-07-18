
var seedControllers = angular.module('seedControllers', []);


seedControllers.controller('HomeController', function($scope, $timeout, $http, Markers, MapData) {

      $scope.$watch(function() {
        $scope.message = "Hello";
    });

});

seedControllers.controller('MapController', function($scope, $state, $http, Markers, NgMap, MapData) {

    NgMap.getMap().then(function(map) {
      map.center = [37.553, -77.462];

      $scope.placeMarker = function(e) {
        console.log("hello");

        var marker = new google.maps.Marker({position: e.latLng, map: map});
        console.log("position: " + e.latLng);

        // google.maps.event.addListener(map, 'click', function(e) {
        //   console.log(e);
        // });


        map.panTo(e.latLng);
      };
  });

  $scope.newMarker = {};

  $scope.placeMarker = function(event) {
    $scope.newMarker.latitude = event.latLng.lat();
    $scope.newMarker.longitude = event.latLng.lng();
    console.log($scope.newMarker);
  };

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
    angular.forEach(response.data.markers, function(marker) {
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
