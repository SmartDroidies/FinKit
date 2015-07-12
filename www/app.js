'use strict';

// Declare app level module which depends on views, and components
angular.module('finkitApp', [
  'ngRoute',
  'underscore',
  'finkitApp.viewCalc',
  'finkitApp.viewKit',
  'myApp.version',
  'LocalStorageModule'
]).
config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.otherwise({redirectTo: '/viewKit'});
  localStorageServiceProvider.setPrefix('fk');
}]);
