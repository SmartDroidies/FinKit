'use strict';

angular.module('finkitApp.viewKit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewKit', {
    templateUrl: 'viewKit/kitHome.html',
    controller: 'ViewKitCtrl'
  }).when('/kitMA', {
    templateUrl: 'viewKit/listAcc.html',
    controller: 'ViewKitAccCtrl'
  }).when('/kitSER', {
    templateUrl: 'viewKit/listVehicle.html',
    controller: 'ViewKitSerCtrl'
  });
}])

.controller('ViewKitCtrl', ['$scope', '$http', function($scope, $http) {

	//Function to display the list of kit
	$scope.displayKitList = function() {
		//FIXME = Collect this from service
		$http.get('data/kits.json').success(function(data) {
			$scope.kits = data;
		});
	};

	//Default function call
	$scope.displayKitList();
}])

.controller('ViewKitAccCtrl', ['$scope', '$http', 'KitService', function($scope, $http, KitService) {

	//Function to display the list of account
	$scope.displayAccList = function() {
	    $("#cnt_modify").hide();
		$("#cnt_list").show(200);
		var accounts = KitService.getAccounts();
		//console.log("Accounts : " + JSON.stringify(accounts));
		$scope.accounts = accounts;
	};

    //Function to display the list of kit
	$scope.newAccount = function() {
	    var defAccount = {};
		$scope.account = defAccount;
		$("#cnt_list").hide();
		$("#cnt_modify").show(500);
	};
	
	//Function to display the list of kit
	$scope.editAccount = function(account) {
	    $scope.account = account;
		$("#cnt_list").hide();
		$("#cnt_modify").show(500);
		//console.log("Account : " + JSON.stringify(account));
	};

	//Function to share an account
	$scope.shareAccount = function(account) {
		console.log("Share Account : " + JSON.stringify(account));
		var account = "Name : " + account.name + "\n" + "Account Number : " + account.number + "\n" + "IFSC : " + account.ifsc + "\n" + "Bank Name : " + account.bank + "\n" + "Bank Branch : " + account.branch;
		window.plugins.socialsharing.share(account, 'Account Details');

	};


	//Cancel Add/Edit
	$scope.cancel = function() {
	    $("#cnt_modify").hide();
		$("#cnt_list").show(200);
	};
	
	$scope.addAccount = function(account) {
		if(!angular.isUndefined(account) && !angular.isUndefined(account.name) && !angular.isUndefined(account.number) && !angular.isUndefined(account.ifsc)) {
			var milliseconds = new Date().getTime();
			var accId = "ACC-" + milliseconds;
			account.id = accId;
			var result = KitService.addNewAccount(account);
			if(result) {
				$scope.displayAccList();
			}
		}
	};
	
	$scope.updateAccount = function(account) {
		if(!angular.isUndefined(account) && !angular.isUndefined(account.id) && !angular.isUndefined(account.name) && !angular.isUndefined(account.number) && !angular.isUndefined(account.ifsc)) {
			var result = KitService.updateAccount(account);
			if(result) {
				$scope.displayAccList();
			}
		}
	};
	

	//Default function call
	$scope.displayAccList();
}])

.controller('ViewKitSerCtrl', ['$scope', '$http', 'KitService', function($scope, $http, KitService) {

	//Function to display the list of vehicle
	$scope.displayVehicleList = function() {
	    $("#cnt_modify").hide();
		$("#cnt_list").show(200);
		var vehicles = KitService.getVehicles();
		//console.log("Vehicles : " + JSON.stringify(vehicles));
		$scope.vehicles = vehicles;
	};

    //Function to add new vehicle
	$scope.newVehicle = function() {
	    var defVehicle = {};
		$scope.vehicle = defVehicle;
		$("#cnt_list").hide();
		$("#cnt_modify").show(500);
	};
	
	//Function to edit vehicle
	$scope.editVehicle = function(vehicle) {
	    $scope.vehicle = vehicle;
		$("#cnt_list").hide();
		$("#cnt_modify").show(500);
	};

	//Cancel Add/Edit
	$scope.cancel = function() {
	    $("#cnt_modify").hide();
		$("#cnt_list").show(200);
	};
	
	$scope.addVehicle = function(vehicle) {
		if(!angular.isUndefined(vehicle) && !angular.isUndefined(vehicle.name) && !angular.isUndefined(vehicle.number)) {
			var milliseconds = new Date().getTime();
			var vehicleId = "VEH-" + milliseconds;
			vehicle.id = vehicleId;
			var result = KitService.addNewVehicle(vehicle);
			if(result) {
				$scope.displayVehicleList();
			}
		}
	};
	
	$scope.updateVehicle = function(vehicle) {
		if(!angular.isUndefined(vehicle) && !angular.isUndefined(vehicle.id) && !angular.isUndefined(vehicle.name) && !angular.isUndefined(vehicle.number)) {
			var result = KitService.updateVehicle(vehicle);
			if(result) {
				$scope.displayVehicleList();
			}
		}
	};
	
	//Function to add new service record
	$scope.newService = function(vehicleId) {
		var service = {};
		service.vehicleId = vehicleId;
		$scope.service = service;
		$("#cnt_ser_list").hide();
		$("#cnt_ser_modify").show(500);
	};
	
	//Function to edit vehicle
	$scope.editService = function(vehicle, service) {
	    //$scope.vehicle = vehicle;
		//$("#cnt_list").hide();
		//$("#cnt_modify").show(500);
	};

	//Cancel Add/Edit
	$scope.cancelService = function() {
	    $("#cnt_ser_modify").hide();
		$("#cnt_ser_list").show(200);
	};

	$scope.addService = function(service) {
		if(!angular.isUndefined(service) && !angular.isUndefined(service.vehicleId) && !angular.isUndefined(service.date) && !angular.isUndefined(service.km)) {
			var milliseconds = new Date().getTime();
			var serviceId = "SER-" + milliseconds;
			service.id = serviceId;
			var result = KitService.addNewService(service);
			if(result) {
				//FIXME 
				$scope.displayVehicleList();
			}
		}
	};
	

	//Default function call
	$scope.displayVehicleList();
}])

//Service for all the calculations
.factory('KitService', function(StorageService, _) {
    var factory = {}; 

	// Add New Account
	factory.addNewAccount = function(account) {
		//Append the new account into Storage Service
		var userDetail = StorageService.getStoreDetail();	
		var arrAccounts = [];
		var idx = 0;
 		if(userDetail.accounts) {
			arrAccounts = userDetail.accounts;
		}
		arrAccounts.push(account);		
		userDetail.accounts = arrAccounts;
		
		return StorageService.setStoreDetail(userDetail);
	}

	// Update Account
	factory.updateAccount = function(pAccount) {
	    var flgStatus = false;
		//Append the new account into Storage Service
		var userDetail = StorageService.getStoreDetail();	
		var arrAccounts = [];
		var idx = 0;
 		if(userDetail.accounts) {
			var idx = _.findIndex(userDetail.accounts, function(itemAcc) { return itemAcc.id === pAccount.id });
			userDetail.accounts[idx] = pAccount;
			flgStatus = StorageService.setStoreDetail(userDetail);
		}
		return flgStatus;
	}
	
	// Collect list of Accounts
	factory.getAccounts = function() {
		var userDetail = StorageService.getStoreDetail();	
		var accounts = {};
 		if(userDetail.accounts) {
			accounts = userDetail.accounts;
		}
		return accounts;
	}	
	
	// Add New Vehicle
	factory.addNewVehicle = function(vehicle) {
		//Append the new vehicle into Storage Service
		var userDetail = StorageService.getStoreDetail();	
		var arrVehicles = [];
		var idx = 0;
 		if(userDetail.vehicles) {
			arrVehicles = userDetail.vehicles;
		}
		arrVehicles.push(vehicle);		
		userDetail.vehicles = arrVehicles;
		
		return StorageService.setStoreDetail(userDetail);
	}
	
	// Collect list of Vehicles
	factory.getVehicles = function() {
		var userDetail = StorageService.getStoreDetail();	
		var vehicles = {};
 		if(userDetail.vehicles) {
			vehicles = userDetail.vehicles;
		}
		return vehicles;
	}	

	// Update Vehicle
	factory.updateVehicle = function(pVehicle) {
	    var flgStatus = false;
		//Update existing vehicle in Storage Service
		var userDetail = StorageService.getStoreDetail();	
		var arrVehicles = [];
		var idx = 0;
 		if(userDetail.vehicles) {
			var idx = _.findIndex(userDetail.vehicles, function(itemVehicle) { return itemVehicle.id === pVehicle.id });
			userDetail.vehicles[idx] = pVehicle;
			flgStatus = StorageService.setStoreDetail(userDetail);
		}
		return flgStatus;
	}
	
	// Add New Service
	factory.addNewService = function(service) {
		var status = 0;
		//Append the Service to Vehicle in Storage Service
		var userDetail = StorageService.getStoreDetail();	
		//console.log("Service Details : " + JSON.stringify(service));
		var arrVehicles = [];
 		if(userDetail.vehicles) {
			arrVehicles = userDetail.vehicles;
			//console.log("Vehicles : " + JSON.stringify(arrVehicles));
			//console.log("Service Details : " + JSON.stringify(service));
			var vehicle = _.find(arrVehicles, function(veh)	{ 
				return veh.id == service.vehicleId;
			});
			console.log("Vehicle : " + JSON.stringify(vehicle));
			if(vehicle) {
				var arrServices = [];
				if(vehicle.services) {
					arrServices = vehicle.services;
				} 
				arrServices.push(service);		
				vehicle.services = arrServices;
				status = this.updateVehicle(vehicle);
			} 
		} 
		return status;
	}

	
    return factory;
})

//Storage Service 
.factory('StorageService', function(localStorageService) {
    var factory = {}; 
	var key = 'detail';
	var keyDirty = 'flag-dirty';
	
	// Get Store Details
	factory.getStoreDetail = function() {
		//console.log("Collect Store Details");
		if(localStorageService.isSupported) {
			//console.log("Local Storage is Supported");
			var storageType = localStorageService.getStorageType(); 
			//console.log("Storage Type - " + storageType);
			var userDetail = localStorageService.get(key);
			if(!userDetail) {
				userDetail = {};
			}
			return userDetail;
		}
	}
	
	//Set Store Details
	factory.setStoreDetail = function(detail) {
		if(localStorageService.isSupported) {
			var result = localStorageService.set(key, detail);
			if(result) {
				localStorageService.set(keyDirty, true);
				//triggerSync();
			}
			return result;
		}
	}
	
    return factory;
});


