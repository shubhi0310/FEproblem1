angular.module('falconeApp').factory("getVehicleService",function($http){
	var getVehicleApi = "https://findfalcone.herokuapp.com/vehicles";
	var getVehicles = function(){
		return $http.get(getVehicleApi)
       		.then(function(response) {
    		return response;
    	});		
	};
	return { getVehicles: getVehicles };
});