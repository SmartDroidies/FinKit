'use strict';

// Declare app level module which depends on views, and components
angular.module('finkitApp', [
  'ngRoute',
  'finkitApp.viewCalc',
  'finkitApp.viewKit',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/viewCalc'});
}]);
