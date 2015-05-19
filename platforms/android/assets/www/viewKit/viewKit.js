'use strict';

angular.module('finkitApp.viewKit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewKit', {
    templateUrl: 'viewKit/kitHome.html',
    controller: 'ViewKitCtrl'
  });
}])

.controller('ViewKitCtrl', ['$scope', function($scope) {

	//FIXME = Collect this from service
	$scope.kits = [
		{'name': 'Mileage Calculator', 'code': 'KIT_MIL'},
		{'name': 'Service Record Tracker', 'code': 'CALC_SR'},
		{'name': 'Electricity Bill Calculator', 'code': 'CALC_EB'}
	];

}]);