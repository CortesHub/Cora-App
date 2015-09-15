// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var nameApp = angular.module('starter', ['ionic']);

//

nameApp.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// 

nameApp.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'view.html',
      controller: 'ViewCtrl'
    });

  $urlRouterProvider.otherwise("/");

});

//

nameApp.factory('Movies', function ($http) {
  var cachedData;

  function getData(moviename, callback) {
    var url = '../FL.json';
    $http.get(url).success(function (data) {
      cachedData = data.results;
      callback(data.results);
    });
  }

  return {
    list: getData,
    find: function (name, callback) {
      var movie = cachedData.filter(function (entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };
  
});

//

nameApp.controller('ListCtrl', function ($scope, $http, Movies) {
  $scope.movie = {}

  $scope.searchMovieDB = function () {
    Movies.list($scope.movie.name, function (movies) {
      $scope.movies = movies;
    });
  };

  $scope.searchMovieDB();
});

nameApp.controller('ViewCtrl', function ($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function (movie) {
    $scope.movie = movie;
  });
});