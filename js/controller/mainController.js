angular.module("falconeApp")
	.controller("mainController",['$scope','$http','getDestinationService','getVehicleService','getTokenService','$location','$rootScope','$route',
    function($scope,$http,getDestinationService,getVehicleService,getTokenService,$location,$rootScope,$route){
		
		$scope.selectedDestinations = [];
		$scope.selectedVehicles = [];
		$rootScope.selectedEntities = [];
		$scope.MAX_LIMIT = 4;
		$scope.loading = true;
		$scope.timeTaken = 0;
		$scope.wrongVehicleError = "Please select a vehicle whose range is higher than selected destination.";
		var dest = {"name":"Select Destinations"};
		var veh = {"name":"Select Vehicles"};
		var destinationPromise = getDestinationService.getDestinations();
		
		//Fetching planets information from destination service.
		destinationPromise.then(function(result){
			$scope.destinations = result.data; 
			$scope.destinations.unshift(dest);
			$scope.destinations_copy = result.data;
			$scope.dest = $scope.destinations[0];
		});
		
		var vehiclePromise = getVehicleService.getVehicles();
		vehiclePromise.then(function(result){
			$scope.vehicles = result.data;
			$scope.vehicles_copy = result.data;
			$scope.vehicles.unshift(veh);
			$scope.veh = $scope.vehicles[0];
			$scope.loading = false;
		});
		
		var tokenPromise = getTokenService.getToken();
		tokenPromise.then(function(result){
			$rootScope.token = result.data.token;
		});
		
		$scope.addItem = function(){
			if($rootScope.selectedEntities.length != $scope.MAX_LIMIT){
				var selectedEntity = {};
				selectedEntity["destination"] = $scope.dest;
				selectedEntity["vehicle"] = $scope.veh;
				selectedEntity["time"] = $scope.dest.distance / $scope.veh.speed;
				$rootScope.selectedEntities.push(selectedEntity);
				$scope.destinations.splice($scope.destinations.indexOf($scope.dest),1);
				if($scope.veh.total_no > 0){
					$scope.vehicles[$scope.vehicles.indexOf($scope.veh)].total_no--;
				}
				if($scope.veh.total_no == 0){
					$scope.vehicles.splice($scope.vehicles.indexOf($scope.veh),1);
				}
				$scope.dest = $scope.destinations[0];
				$scope.veh = $scope.vehicles[0];
				for(entity in $rootScope.selectedEntities){
					$scope.timeTaken = $scope.timeTaken + $rootScope.selectedEntities[entity].time;
				}
				console.log("selected entity:",$scope.selectedEntities);
			}
		}
		
		$scope.removeItem = function(entity){
			$rootScope.selectedEntities.splice($scope.selectedEntities.indexOf(entity),1);
			$scope.timeTaken = $scope.timeTaken - entity.time;
			console.log("updated time taken:"+$scope.timeTaken);
			$scope.destinations.push(entity.destination);
			var index = $scope.vehicles.indexOf(entity.vehicle);
			if(index == -1){
				$scope.vehicles.push(entity.vehicle);
				var new_index = $scope.vehicles.indexOf(entity.vehicle);
				$scope.vehicles[new_index].total_no = 1;
			}else{
				$scope.vehicles[index].total_no++;
			}
		}
		
		$scope.findFalcone = function(){
			$rootScope.timeTaken = $scope.timeTaken;
			$location.path("/report");
		}
		
		$scope.reset = function(){
			$route.reload();
		}
}]);