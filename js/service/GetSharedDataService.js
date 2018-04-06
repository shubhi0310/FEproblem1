angular.module('falconeApp').factory("getSharedDataService",function($window){

	function setResultData(obj, timetaken){
		var resultData = {};
		resultData.status = obj.status;
		resultData.planet_names = obj.planet_name;
		resultData.timetaken = timetaken;
		$window.sessionStorage.setItem("RESULT", JSON.stringify(resultData));

	}
	function getResultData(){
		var resultData = JSON.parse($window.sessionStorage.getItem("RESULT"));
		return resultData;
	}

	return { getResultData: getResultData,
			 setResultData: setResultData };

});