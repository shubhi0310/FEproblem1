(function () {
    'use strict';
    angular
        .module('falconeApp', ['ngRoute','angularModalService'])
        .config(['$routeProvider',
		 function($routeProvider) {
          $routeProvider
            .when('/', {
                controller: 'mainController',
                templateUrl: 'html/main.html'
            })

            .when('/main', {
                controller: 'mainController',
                templateUrl: 'html/main.html'
            })
            
            .when('/report', {
                controller: 'resultController',
                templateUrl: 'html/result.html'
            })

            .otherwise({ redirectTo: '/' });
    }]);
})();