angular.module('falconeApp').factory("getResultService",['$http',function($http){
	var getResultApi = "https://findfalcone.herokuapp.com/find";
	var headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'};
	
	var getFinalResult = function(reqData){
	return $http({
        url: getResultApi,
        method: "POST",
        data: reqData,
        headers: headers,
        }).then(function (response) {
        	if (typeof response.data === 'object') {
                return response.data;
            } else {
                return response.data;
            }
        }).catch(function(response) {
            return response;
        });
      }
      return { getFinalResult: getFinalResult };

}]);