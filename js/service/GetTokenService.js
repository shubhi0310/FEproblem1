angular.module('falconeApp').factory("getTokenService",function($http){
	var getTokenApi = "https://findfalcone.herokuapp.com/token";
	var getToken = function(){
		return $http({
        url: getTokenApi,
        method: "POST",
        headers: {'Accept' : 'application/json'}
        }).then(function (data, status, headers, config) {
                return data;
        });
    };  
	return { getToken: getToken };
});
