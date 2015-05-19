'use strict';

angular.module('finkitApp.viewCalc', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewCalc', {
    templateUrl: 'viewCalc/calcHome.html',
    controller: 'ViewCalcCtrl'
  }).when('/viewFD', {
    templateUrl: 'viewCalc/calcFD.html',
    controller: 'ViewCalcFDCtrl'
  }).when('/viewRD', {
    templateUrl: 'viewCalc/calcRD.html',
    controller: 'ViewCalcRDCtrl'
  });
}])

//Controller 
.controller('ViewCalcCtrl', ['$scope', '$http', function($scope, $http) {
	//Function to display the list of calculators
	$scope.displayCalcList = function() {
		//console.log('Display Calc List here');

		//FIXME = Collect this from service
		$http.get('data/calcs.json').success(function(data) {
			$scope.calcs = data;
		});
		
	};
	
	//Default function call
	$scope.displayCalcList();
}])

//Controller to view Fixed Deposit
.controller('ViewCalcFDCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	$scope.master = {};

	$scope.reset = function() {
		alert('Reset Form');
	};

	$scope.calculate = function(invest) {
		if(!angular.isUndefined(invest) && !angular.isUndefined(invest.principal) && !angular.isUndefined(invest.interest) && !angular.isUndefined(invest.period) && !angular.isUndefined(invest.frequency)) {
			$scope.result = CalcService.cacluateFD(invest);
		}
	};

	
	//Function to display the list of calculators
	$scope.displayFDCalc = function() {
		$scope.msg = "Display FD Calculator";

		var defInvest = {};
		defInvest.interest = 8.5;
		defInvest.period = 12;
		defInvest.periodType = '12';
		defInvest.frequency = '4';
		
		$scope.invest = defInvest;
	};
	
	//Default function call
	$scope.displayFDCalc();
}])

//Controller to view Recurring Deposit
.controller('ViewCalcRDCtrl', ['$scope', '$http', function($scope, $http) {
	//Function to display the list of calculators
	$scope.displayRDCalc = function() {
		$scope.msg = "Display RD Calculator";
	};
	
	//Default function call
	$scope.displayRDCalc();
}])

//Service for all the calculations
.factory('CalcService', function() {
    var factory = {}; 

	// Calculate Fixed Deposit
	factory.cacluateFD = function(invest) {
		console.log("Invest : " + JSON.stringify(invest));
		var result = {}; 
		
		var r = invest.interest/100;
		var n = invest.frequency;
		var t = invest.period/invest.periodType;
		//result.maturity = Math.pow((invest.principal * (1+r/n)), (n*t));
		var a =  invest.principal * Math.pow((1+r/n), (n*t));
		result.maturity =  a.toFixed(2);
		result.investment = invest.principal;
		result.earned = (result.maturity - result.investment).toFixed(2);
		console.log("Result : " + JSON.stringify(result));
		return result;
	}
	
    return factory;
});

