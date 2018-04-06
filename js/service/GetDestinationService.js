angular.module('falconeApp').factory("getDestinationService",function($http){
  var getDestinationApi = "https://findfalcone.herokuapp.com/planets";
  var getDestinations = function(){
    return $http.get(getDestinationApi)
          .then(function(response) {
        return response;
      });   
  };
  return { getDestinations: getDestinations };
});
