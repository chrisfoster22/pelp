(function() {

var myApp = angular.module('myApp', [
  'ui.router',
  'seedControllers',
  'ngSanitize',
  'ngMap'
  ]);

//you need ngSanitize for changing the innerHTML on an element using Angular.
//See the add_another controller for seeing it in action.

  myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise("/home");
    //
    // The states
    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "views/home.html"
      })
      .state('listing', {
        url: "/listing/:listingId",
        templateUrl: "views/listing.html"
      })
      .state('page3', {
        url: "/page3",
        templateUrl: "views/page3.html"
      });
  }); //end config

myApp.service('Markers', function($http) {
  return {
      get: function () {
          return $http.get('/markers.json');
      }
  };
});

myApp.service('MapData', function($http) {
  return {
           selectedType: "All"
         };
});

// AIzaSyCeoy8WtdCmjqljQUIFuE3wffWjG03q4LU

}()); //end wrapper function
