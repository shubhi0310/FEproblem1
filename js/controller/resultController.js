angular.module("falconeApp").controller("resultController",['$scope','$rootScope','$http','getResultService','$location',
       function($scope,$rootScope,$http,getResultService,$location){
		   
		if($rootScope.selectedEntities === undefined){
			$location.path("/");
		}
		
		$scope.loading = true;
		console.log("result:",$rootScope.selectedEntities);
		$scope.request_data = {};
		var planet_names = [];
		var vehicle_names = []; 
		
		for(entity in $rootScope.selectedEntities){
			planet_names.push($rootScope.selectedEntities[entity].destination.name);
		}
		
		for(entity in $rootScope.selectedEntities){
			vehicle_names.push($rootScope.selectedEntities[entity].vehicle.name);
		}
		
		$scope.request_data.planet_names = planet_names;
		$scope.request_data.vehicle_names = vehicle_names;
		$scope.request_data.token = $rootScope.token;
		
		console.log("request data:",$scope.request_data);
		
		var resultPromise = getResultService.getFinalResult($scope.request_data);
	
	    resultPromise.then(function(response){
			$scope.result = response;
			console.log("final result:",$scope.result);
			$scope.loading = false;
	    });
		
}]);