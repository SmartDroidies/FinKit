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
  }).when('/viewPL', {
    templateUrl: 'viewCalc/calcPL.html',
    controller: 'ViewCalcPLCtrl'
  }).when('/viewCL', {
    templateUrl: 'viewCalc/calcCL.html',
    controller: 'ViewCalcCLCtrl'
  }).when('/viewHL', {
    templateUrl: 'viewCalc/calcHL.html',
    controller: 'ViewCalcHLCtrl'
  }).when('/viewINT', {
    templateUrl: 'viewCalc/calcINT.html',
    controller: 'ViewCalcINTCtrl'
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
		this.displayFDCalc();
	};

	$scope.calculate = function(invest) {
		if(!angular.isUndefined(invest) && !angular.isUndefined(invest.principal) && !angular.isUndefined(invest.interest) && !angular.isUndefined(invest.period) && !angular.isUndefined(invest.frequency)) {
			$scope.result = CalcService.cacluateFD(invest);
			$("#result").show();
		}
	};

	
	//Function to display the list of calculators
	$scope.displayFDCalc = function() {
		
		$("#result").hide();

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
.controller('ViewCalcRDCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	//Function to display the list of calculators
	$scope.displayRDCalc = function() {

		$("#result").hide();

		var defInvest = {};
		defInvest.interest = 8.5;
		defInvest.period = 12;
		defInvest.frequency = '4';
			
		$scope.invest = defInvest;
	};

	$scope.reset = function() {
		this.displayRDCalc();
	};

	
	$scope.calculate = function(invest) {
		if(!angular.isUndefined(invest) && !angular.isUndefined(invest.instalment) && !angular.isUndefined(invest.interest) && !angular.isUndefined(invest.period)) {
			$scope.result = CalcService.cacluateRD(invest);
			$("#result").show();
		}

	};

	
	//Default function call
	$scope.displayRDCalc();
}])

//Controller to view Personal Loan Schedule
.controller('ViewCalcPLCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	//Function to display the list of calculators
	$scope.displayPLCalc = function() {

		$("#result").hide();

		var defLoan = {};
		defLoan.amount = 300000;
		defLoan.interest = 17.5;
		defLoan.tenure = 3;
		defLoan.tenureType = "12";
			
		$scope.loan = defLoan;
	};

	$scope.calculate = function(loan) {
		if(!angular.isUndefined(loan) && !angular.isUndefined(loan.amount) && !angular.isUndefined(loan.interest) && !angular.isUndefined(loan.tenure) && !angular.isUndefined(loan.tenureType)) {
			$scope.result = CalcService.cacluatePL(loan);
			$("#result").show();
		}
	};

	$scope.reset = function() {
		this.displayPLCalc();
	};
	
	//Default function call
	$scope.displayPLCalc();
}])

//Controller to view Car Loan Schedule
.controller('ViewCalcCLCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	//Function to display the list of calculators
	$scope.displayCLCalc = function() {

		$("#result").hide();

		var defLoan = {};
		defLoan.amount = 400000;
		defLoan.interest = 12.5;
		defLoan.tenure = 5;
		defLoan.tenureType = "12";
		$scope.loan = defLoan;
	};

	$scope.calculate = function(loan) {
		if(!angular.isUndefined(loan) && !angular.isUndefined(loan.amount) && !angular.isUndefined(loan.interest) && !angular.isUndefined(loan.tenure) && !angular.isUndefined(loan.tenureType)) {
			$scope.result = CalcService.cacluateCL(loan);
			$("#result").show();
		}
	};

	$scope.reset = function() {
		this.displayCLCalc();
	};
	
	//Default function call
	$scope.displayCLCalc();
}])

//Controller to view Home Loan Schedule
.controller('ViewCalcHLCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	//Function to display the list of calculators
	$scope.displayHLCalc = function() {

		$("#result").hide();

		var defLoan = {};
		defLoan.amount = 4000000;
		defLoan.interest = 10.5;
		defLoan.tenure = 20;
		defLoan.tenureType = "12";
		$scope.loan = defLoan;
	};

	$scope.calculate = function(loan) {
		if(!angular.isUndefined(loan) && !angular.isUndefined(loan.amount) && !angular.isUndefined(loan.interest) && !angular.isUndefined(loan.tenure) && !angular.isUndefined(loan.tenureType)) {
			$scope.result = CalcService.cacluateHL(loan);
			$("#result").show();
		}
	};

	$scope.reset = function() {
		this.displayHLCalc();
	};
	
	//Default function call
	$scope.displayHLCalc();
}])

//Controller to calculate interest
.controller('ViewCalcINTCtrl', ['$scope', '$http', 'CalcService', function($scope, $http, CalcService) {
	//Function to display calculator UI
	$scope.displayINTCalc = function() {
		$("#result").hide();

		var defLoan = {};
		defLoan.amount = 50000;
		defLoan.interest = 3;
		defLoan.tenure = 6;
		defLoan.tenureType = "1";
		$scope.loan = defLoan;
	};

	$scope.calculate = function(loan) {
		if(!angular.isUndefined(loan) && !angular.isUndefined(loan.amount) && !angular.isUndefined(loan.interest) && !angular.isUndefined(loan.tenure) && !angular.isUndefined(loan.tenureType)) {
			$scope.result = CalcService.cacluateInt(loan);
			$("#result").show();
		}
	};

	$scope.reset = function() {
		this.displayINTCalc();
	};
	
	//Default function call
	$scope.displayINTCalc();
}])


//Service for all the calculations
.factory('CalcService', function() {
    var factory = {}; 

	// Calculate Fixed Deposit
	factory.cacluateFD = function(invest) {
		//console.log("Invest : " + JSON.stringify(invest));
		var result = {}; 
		
		var r = invest.interest/100;
		var n = invest.frequency;
		var t = invest.period/invest.periodType;
		var a =  invest.principal * Math.pow((1+r/n), (n*t));
		result.maturity =  a.toFixed(2);
		result.investment = invest.principal;
		result.earned = (result.maturity - result.investment).toFixed(2);
		//console.log("Result : " + JSON.stringify(result));
		return result;
	}
	
	// Calculate Recurring Deposit
	factory.cacluateRD = function(invest) {
		//console.log("Invest : " + JSON.stringify(invest));
		var result = {}; 
		
		var r = invest.interest/400;
		var n = invest.period/3;
		
		var m = (invest.instalment * [Math.pow((1+r), n)-1])/(1-Math.pow((1+r), -(1/3)));
		
		result.maturity =  m.toFixed(2);
		result.investment = invest.instalment * invest.period;
		result.earned = (result.maturity - result.investment).toFixed(2);
		//console.log("Result : " + JSON.stringify(result));
		return result;
	}

	// Calculate Personal Loan
	factory.cacluatePL = function(loan) {
		//console.log("Loan : " + JSON.stringify(loan));
		var result = {}; 
		
		var r = loan.interest/12/100;
		var n = loan.tenure * loan.tenureType;
		
		var emi = (loan.amount * r) * ((Math.pow(1+r, n))/(Math.pow(1+r, n) -1));
		result.emi =  emi.toFixed(2);
		result.total = (emi * n).toFixed(2);
		result.interest = (result.total - loan.amount).toFixed(2);
		return result;
	}

	// Calculate Car Loan
	factory.cacluateCL = function(loan) {
		//console.log("Loan : " + JSON.stringify(loan));
		var result = {}; 
		
		var r = loan.interest/12/100;
		var n = loan.tenure * loan.tenureType;
		
		var emi = (loan.amount * r) * ((Math.pow(1+r, n))/(Math.pow(1+r, n) -1));
		result.emi =  emi.toFixed(2);
		result.total = (emi * n).toFixed(2);
		result.interest = (result.total - loan.amount).toFixed(2);
		return result;
	}

	// Calculate Home Loan
	factory.cacluateHL = function(loan) {
		//console.log("Loan : " + JSON.stringify(loan));
		var result = {}; 
		
		var r = loan.interest/12/100;
		var n = loan.tenure * loan.tenureType;
		
		var emi = (loan.amount * r) * ((Math.pow(1+r, n))/(Math.pow(1+r, n) -1));
		result.emi =  emi.toFixed(2);
		result.total = (emi * n).toFixed(2);
		result.interest = (result.total - loan.amount).toFixed(2);
		return result;
	}

	// Calculate Monthly Interest
	factory.cacluateInt = function(loan) {
		//console.log("Loan : " + JSON.stringify(loan));
		var result = {}; 
		var r = (loan.interest*12);
		var n = loan.tenure/12;
		
		result.interest = ((loan.amount * r * n) / 100).toFixed(2);
		result.monthinterest = (result.interest/loan.tenure).toFixed(2);
		return result;
	}


	
    return factory;
});

